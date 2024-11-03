import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, ListRenderItem, RefreshControl, View } from 'react-native';
import { DiasText, NormalText, Title } from './styled';
import { RFValue } from 'react-native-responsive-fontsize';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';

import Loader from '../Loader';
import ContainerAlarm from '../../components/Alarms/ContainerAlarms';
import alarmsService from '../../services/alarmsService';
import { Alarm } from '../../entities/Alarm';
import ContainerRenderAnimated from '../../components/common/ContainerRenderAnimated';
import ContainerGradient from '../../components/common/ContainerGradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PropsNavigationStack, PropsStack } from '../../routes';
import BotaoAdd from '../../components/common/BotaoAdd';

type NextAlarm = {
    value: number;
    unit: string;
}

type Props = NativeStackScreenProps<PropsNavigationStack, 'Alarms'>;

const Alarms = ({ route }: Props) => {
    const isFocused = useIsFocused();
    const navigation = useNavigation<PropsStack>();
    const { newAlarm } = route.params || {};

    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [alarms, setAlarms] = useState<Alarm[]>([]);
    const [nextAlarm, setNextAlarm] = useState<NextAlarm | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (isFocused || newAlarm) {
            handleGetAlarms();
        }
    }, [isFocused, newAlarm]);

    const handleGetAlarms = async () => {
        setIsLoading(true);
        try {
            const { data } = await alarmsService.getAlarms();
            setAlarms(data);

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
    };

    const handleToggleAlarmStatus = async (alarmId: string) => {
        await alarmsService.toggleAlarmStatus({ _id: alarmId });
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
                        <>
                            <Title>Alarmes</Title>
                        </>
                        <NormalText>
                            Próximo alarme em X horas \ minutos \ dias
                        </NormalText>
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
