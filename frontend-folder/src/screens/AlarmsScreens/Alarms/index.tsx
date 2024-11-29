import React, { useCallback, useEffect, useState } from 'react';
import { DiasText, NormalText, Title } from './styled';
import { Alert, FlatList, ListRenderItem, RefreshControl, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import Loader from '../../Loader';
import ContainerAlarm from '../../../components/Alarms/ContainerAlarms';
import alarmsService from '../../../services/alarmsService';
import { Alarm } from '../../../entities/Alarm';
import ContainerRenderAnimated from '../../../components/common/ContainerRenderAnimated';
import ContainerGradient from '../../../components/common/ContainerGradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PropsNavigationStack, PropsStack } from '../../../routes';
import BotaoAdd from '../../../components/common/BotaoAdd';
import notificationsService from '../../../services/notificationsService';

type Props = NativeStackScreenProps<PropsNavigationStack, 'Alarms'>;

const Alarms = ({ route }: Props) => {
    const isFocused = useIsFocused();
    const navigation = useNavigation<PropsStack>();
    const { newAlarm } = route.params || {};

    const [alarms, setAlarms] = useState<Alarm[]>([]);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [nextAlarm, setNextAlarm] = useState<any>(null);

    useEffect(() => {
        if (isFocused || newAlarm) {
            handleGetAlarms();
        }
    }, [isFocused, newAlarm]);

    const handleGetAlarms = async () => {
        setIsLoading(true);
        try {
            const { data } = await alarmsService.getAlarms();
            setAlarms(data.alarms);

            const nextAlarmID = data.nextAlarmId;

            if (nextAlarmID) {
                const nextAlarm = data.alarms.find((alarm: Alarm) => alarm._id === nextAlarmID);
                setNextAlarm(nextAlarm);

                notificationsService.scheduleNotification(nextAlarmID);
            } else {
                setNextAlarm(null);
            }
        } catch (err) {
            Alert.alert('Erro', 'Erro ao buscar alarmes');
        } finally {
            setIsLoading(false);
        }
    };

    const onRefresh = useCallback(() => {
        setIsRefreshing(true);
        handleGetAlarms().then(() => setIsRefreshing(false));
    }, []);

    const handleDeleteAlarm = async (alarmId: string) => {
        await alarmsService.deleteAlarm({ _id: alarmId });
        const updatedAlarms = alarms.filter(alarm => alarm._id !== alarmId);
        setAlarms(updatedAlarms);

        if (alarmId === nextAlarm?._id) {
            handleGetAlarms();
        }
    };

    const handleToggleAlarmStatus = async (alarmId: string) => {
        const { data } = await alarmsService.toggleAlarmStatus({ _id: alarmId });

        const nextAlarmID = data.nextAlarmId;
        if (nextAlarmID) {
            const nextAlarm = alarms.find(alarm => alarm._id === nextAlarmID);
            setNextAlarm(nextAlarm);
        } else {
            setNextAlarm(null);
        }
    };

    const navigateToCreateAlarm = () => {
        navigation.navigate('CreateAlarm');
    }

    const renderItem: ListRenderItem<Alarm> = ({ item, index }) => (
        <ContainerRenderAnimated index={index}>
            <ContainerAlarm
                alarm={item}
                deleteAlarm={() => handleDeleteAlarm(item._id)}
                toggleAlarmStatus={() => handleToggleAlarmStatus(item._id)}
            />
        </ContainerRenderAnimated>
    )

    if (isLoading) return <Loader type='load' />

    return (
        <ContainerGradient screen='Alarms'>
            <FlatList
                style={{ marginTop: RFValue(60), marginBottom: RFValue(70) }}
                data={alarms}
                keyExtractor={item => item._id}
                ListHeaderComponent={
                    <View style={{ marginHorizontal: RFValue(16) }}>
                        <Title>Alarmes</Title>

                        {nextAlarm ? (
                            <NormalText>
                                Próximo alarme: <DiasText>{nextAlarm?.title}</DiasText>
                            </NormalText>
                        ) : (
                            <NormalText>Nenhum alarme em progresso...</NormalText>
                        )}
                    </View>
                }
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
                }
            />

            <BotaoAdd navigate={navigateToCreateAlarm} />
        </ContainerGradient>
    )
}

export default Alarms;
