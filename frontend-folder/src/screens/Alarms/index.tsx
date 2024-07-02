import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { PropsNavigationStack, PropsStack } from '../../routes'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { Alarm } from '../../entities/Alarm';
import { deleteAlarm, getAlarms, toggleAlarmStatus } from '../../services/alarmsService';
import { ListRenderItem, FlatList } from 'react-native';
import ContainerAlarm from '../../components/Alarms/ContainerAlarms';
import { Container, DiasText, NormalText, Title } from './styled';
import Navbar from '../../components/common/Navbar'
import BotaoAdd from '../../components/common/BotaoAdd';

type Props = NativeStackScreenProps<PropsNavigationStack, 'Alarms'>;

type NextAlarm = {
    value: number;
    unit: string;
}

const Alarms = ({ route }: Props) => {
    const navigation = useNavigation<PropsStack>();
    const isFocused = useIsFocused();
    const theme = useTheme();

    const { newAlarm } = route.params || {};
    const [alarms, setAlarms] = useState<Alarm[]>([]);
    const [nextAlarm, setNextAlarm] = useState<NextAlarm | null>(null);

    const navigateToCreateAlarm = () => {
        navigation.navigate('CreateAlarm');
    };

    const handleGetAlarms = async () => {
        const alarms = await getAlarms('@alarms');
        console.log(alarms);
        setAlarms(alarms);
        // calculateDaysUntilNextAlarm(alarms);
    };

    useEffect(() => {
        if (isFocused || newAlarm) {
            handleGetAlarms();
        }
    }, [isFocused, newAlarm]);

    const handleDeleteAlarm = async (alarmId: string) => {
        const newAlarms = await deleteAlarm(alarmId);
        setAlarms(newAlarms);
        // calculateDaysUntilNextAlarm(newAlarms);
    };

    const handleToggleAlarmStatus = async (alarmId: string, status: boolean) => {
        const newAlarms = await toggleAlarmStatus(alarmId, status);
        setAlarms(newAlarms);
        // calculateDaysUntilNextAlarm(newAlarms);
    };

    // const calculateDaysUntilNextAlarm = (alarms: Alarm[]) => {
    //     const todayDate = new Date();
    //     const nextAlarm = alarms
    //         .filter(item => item.status)
    //         .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

    //     if (nextAlarm) {
    //         const timeDiff = new Date(nextAlarm.date).getTime() - todayDate.getTime();
    //         const minutesDiff = Math.ceil(timeDiff / 1000);
    //         const hoursDiff = Math.ceil(timeDiff / (1000 * 3600));
    //         const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    //         if (hoursDiff === 0) {
    //             setNextAlarm({ value: minutesDiff, unit: 'minutos' });
    //         } else if (hoursDiff < 24) {
    //             setNextAlarm({ value: hoursDiff, unit: 'horas' });
    //         } else {
    //             setNextAlarm({ value: daysDiff, unit: 'dias' });
    //         }
    //     } else {
    //         setNextAlarm(null);
    //     }
    // }

    const renderItem: ListRenderItem<Alarm> = ({ item }) => (
        <ContainerAlarm 
            alarm={item}
            deleteAlarm={() => handleDeleteAlarm(item._id)}
            toggleAlarmStatus={() => handleToggleAlarmStatus(item._id, item.status)}
        />
    )

    return (
        <Container source={theme.images.bgMain}>
            <FlatList 
                data={alarms}
                keyExtractor={item => item._id}
                ListHeaderComponent={
                    <>
                        <Title>Alarmes</Title>
                        <NormalText>
                            {nextAlarm && nextAlarm.value > 0 ? (
                                `Próximo alarme em `
                            ) : (
                                "Nenhum alarme em progresso..."
                            )}
                            {nextAlarm && nextAlarm.value > 0 && <DiasText>{nextAlarm.value}</DiasText>}
                            {nextAlarm && nextAlarm.value > 0 && ` ${nextAlarm.unit}...`}
                        </NormalText>
                    </>
                }
                renderItem={renderItem}
            />
            <BotaoAdd navigate={navigateToCreateAlarm} />
            <Navbar screen='Alarms' />
        </Container>
    )
}

export default Alarms;