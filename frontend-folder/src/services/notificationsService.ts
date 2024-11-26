import notifee, { AndroidImportance, TimestampTrigger, TriggerType } from '@notifee/react-native';
import alarmsService from './alarmsService';

const notificationsService = {
    scheduleNotification: async (_id: string) => {
        await notifee.requestPermission();

        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
            vibration: true,
            sound: 'default',
            importance: AndroidImportance.HIGH
        });

        const { data } = await alarmsService.getScheduleNotificationData({ _id });

        const date = new Date(data.date);

        const trigger: TimestampTrigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: date.getTime()
        };

        await notifee.createTriggerNotification(
            {
                id: _id,
                title: '⏰ <strong>Seu alarme está tocando!</strong>',
                body: `🔔 Chegou a hora do seu alarme <strong>${data.title}</strong>`,
                android: {
                    channelId,
                },
            },
            trigger
        );

        console.log('Notificação agendada');
    }
};

export default notificationsService;