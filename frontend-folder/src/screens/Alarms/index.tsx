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
import { RFValue } from 'react-native-responsive-fontsize';

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
        setAlarms(alarms);
        calculateDaysUntilNextAlarm(alarms);
    };

    useEffect(() => {
        if (isFocused || newAlarm) {
            handleGetAlarms();
        }
    }, [isFocused, newAlarm]);

    const handleDeleteAlarm = async (alarmId: string) => {
        const newAlarms = await deleteAlarm(alarmId);
        setAlarms(newAlarms);
        calculateDaysUntilNextAlarm(newAlarms);
    };

    const handleToggleAlarmStatus = async (alarmId: string, status: boolean) => {
        const newAlarms = await toggleAlarmStatus(alarmId, status);
        setAlarms(newAlarms);
        calculateDaysUntilNextAlarm(newAlarms);
    };

    // const calculateDaysUntilNextAlarm = (alarms: Alarm[]) => {
    //     const today = new Date();
    //     let nextAlarmTime: Date | null = null as Date | null;

    //     alarms.forEach(alarm => {
    //         if (alarm.status) {
    //             const alarmHour = new Date(alarm.hour);
    //             const days = Object.keys(alarm.days).filter(day => alarm.days[day as keyof typeof alarm.days]);

    //             days.forEach(day => {
    //                 const dayIndex = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(day);
    //                 let alarmTime = new Date(today);
    //                 alarmTime.setHours(alarmHour.getHours(), alarmHour.getMinutes(), 0, 0);

    //                 const diffDays = (dayIndex + 7 - today.getDay()) % 7;
    //                 alarmTime.setDate(today.getDate() + diffDays);

    //                 if (diffDays === 0 && alarmTime < today) {
    //                     alarmTime.setDate(alarmTime.getDate() + 7);
    //                 }

    //                 if (!nextAlarmTime || alarmTime < nextAlarmTime) {
    //                     nextAlarmTime = alarmTime;
    //                 }
    //             });
    //         }
    //     });

    //     if (nextAlarmTime) {
    //         const timeDiff = nextAlarmTime.getTime() - today.getTime();
    //         const minutesDiff = Math.ceil(timeDiff / 1000 / 60);
    //         const hoursDiff = Math.ceil(timeDiff / 1000 / 3600);
    //         const daysDiff = Math.ceil(timeDiff / 1000 / 3600 / 24);

    //         if (hoursDiff < 1) {
    //             setNextAlarm({ value: minutesDiff, unit: 'minutos' });
    //         } else if (hoursDiff < 24) {
    //             setNextAlarm({ value: hoursDiff, unit: 'horas' });
    //         } else {
    //             setNextAlarm({ value: daysDiff, unit: 'dias' });
    //         }
    //     } else {
    //         setNextAlarm(null);
    //     }
    // };

    const calculateDaysUntilNextAlarm = (alarms: Alarm[]) => {
        const today = new Date();
        let nextAlarmTime: Date | null = null;
    
        alarms.forEach(alarm => {
            if (alarm.status) {
                const alarmHour = new Date(alarm.hour);
                const days = Object.keys(alarm.days).filter(day => alarm.days[day as keyof typeof alarm.days]);
    
                days.forEach(day => {
                    const dayIndex = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(day);
                    let alarmTime = new Date(today);
                    alarmTime.setHours(alarmHour.getHours(), alarmHour.getMinutes(), 0, 0);
    
                    const diffDays = (dayIndex + 7 - today.getDay()) % 7;
                    alarmTime.setDate(today.getDate() + diffDays);
    
                    if (diffDays === 0 && alarmTime <= today) {
                        alarmTime.setDate(alarmTime.getDate() + 7);
                    }
    
                    if (!nextAlarmTime || alarmTime < nextAlarmTime) {
                        nextAlarmTime = alarmTime;
                    }
                });
            }
        });
    
        if (nextAlarmTime) {
            const timeDiff = new Date(nextAlarmTime).getTime() - today.getTime();
            const minutesDiff = Math.ceil(timeDiff / (1000 * 60));
            const hoursDiff = Math.ceil(timeDiff / (1000 * 3600));
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
            if (hoursDiff < 24) {
                setNextAlarm({ value: hoursDiff < 1 ? minutesDiff : hoursDiff, unit: hoursDiff < 1 ? 'minutos' : 'horas' });
            } else {
                setNextAlarm({ value: daysDiff, unit: 'dias' });
            }
        } else {
            setNextAlarm(null);
        }
    };

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
                style={{marginBottom: RFValue(60)}}
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