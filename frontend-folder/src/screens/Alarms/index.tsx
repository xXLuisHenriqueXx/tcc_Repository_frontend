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

    const scheduleNotification = async (alarmTitle: string, alarmTime: Date) => {
        if (alarmTime > new Date()) {
            const notificationId = await Notifications.scheduleNotificationAsync({
                content: {
                    title: alarmTitle,
                    body: "Seu alarme está tocando!",
                    sound: 'default'
                },
                trigger: {
                    date: alarmTime
                }
            });

            console.log('Scheduled notification with id:', notificationId);
            return notificationId;
        } else {
            console.log('Alarm time is in the past, notification not scheduled.');
            return null;
        }
    };

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

            const validAlarms = data.filter((alarm: Alarm) => alarm.status);
            validAlarms.forEach((alarm: Alarm) => {
                const nextAlarmTime = calculateNextAlarmTime(alarm);
                if (nextAlarmTime) scheduleNotification(alarm.title, nextAlarmTime);
            });

            calculateNextAlarm(validAlarms);

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
        calculateNextAlarm(updatedAlarms);
    };

    const handleToggleAlarmStatus = async (alarmId: string) => {
        await alarmsService.toggleAlarmStatus({ _id: alarmId });
        calculateNextAlarm(alarms);
    };

    const calculateNextAlarm = (alarms: Alarm[]) => {
        const today = new Date();
        let nextAlarmTime: Date | null = null;

        alarms.forEach(alarm => {
            if (alarm.status) {
                const alarmHour = new Date(alarm.hour);
                const days = Object.keys(alarm?.days).filter(day => alarm?.days[day as keyof typeof alarm.days]);

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
            const minutesDiff = Math.floor(timeDiff / (1000 * 60));
            const hoursDiff = Math.floor(timeDiff / (1000 * 3600));
            const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

            if (hoursDiff < 24) {
                setNextAlarm({ value: hoursDiff < 1 ? minutesDiff : hoursDiff, unit: hoursDiff < 1 ? 'minutos' : 'horas' });
            } else {
                setNextAlarm({ value: daysDiff, unit: 'dias' });
            }
        } else {
            setNextAlarm(null);
        }
    };

    const calculateNextAlarmTime = (alarm: Alarm): Date | null => {
        const today = new Date();
        const todayDayIndex = today.getDay();
        const alarmTime = new Date(alarm.hour);

        const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const activeDays = daysOfWeek
            .map((day, index) => (alarm.days[day as keyof typeof alarm.days] ? index : null))
            .filter(dayIndex => dayIndex !== null) as number[];

        if (activeDays.length === 0) {
            return null;
        }

        activeDays.sort((a, b) => a - b);

        const currentTimeInMinutes = today.getHours() * 60 + today.getMinutes();
        const alarmTimeInMinutes = alarmTime.getHours() * 60 + alarmTime.getMinutes();

        let nextAlarmDayIndex = activeDays.find(day => 
            (day > todayDayIndex) || (day === todayDayIndex && alarmTimeInMinutes > currentTimeInMinutes)
        ) ?? activeDays[0];

        const daysUntilNextAlarm = (nextAlarmDayIndex + 7 - todayDayIndex) % 7;
        const nextAlarmDate = new Date(today);
        nextAlarmDate.setDate(today.getDate() + daysUntilNextAlarm);
        nextAlarmDate.setHours(alarmTime.getHours(), alarmTime.getMinutes(), 0, 0);

        return nextAlarmDate;
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
                            {nextAlarm && nextAlarm.value > 0 ? (
                                `Próximo alarme em `
                            ) : (
                                "Nenhum alarme em progresso..."
                            )}
                            {nextAlarm && nextAlarm.value > 0 && <DiasText>{nextAlarm.value}</DiasText>}
                            {nextAlarm && nextAlarm.value > 0 && ` ${nextAlarm.unit}...`}
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
