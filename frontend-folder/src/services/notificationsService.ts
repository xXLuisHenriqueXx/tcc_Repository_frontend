import notifee, { AndroidImportance, EventType, TimestampTrigger, TriggerType } from '@notifee/react-native';
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

        await notifee.cancelNotification(_id);

        await notifee.createTriggerNotification(
            {
                id: _id,
                title: '⏰ <strong>Seu alarme está tocando!</strong>',
                body: `🔔 Chegou a hora do seu alarme <strong>${data.title}</strong>`,
                android: {
                    channelId,
                    actions: [
                        {
                            title: 'Desligar',
                            pressAction: {
                                id: 'desligar',
                            }
                        }
                    ]
                },
            },
            trigger
        );

        console.log('Notificação agendada');
    }
};

notifee.onForegroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;

    if (type === EventType.ACTION_PRESS && pressAction?.id === 'desligar') {
        if (notification?.id) {
            notifee.cancelNotification(notification.id);

            const response = await alarmsService.toggleAlarmStatus({ _id: notification.id });
            console.log(response);
        }
    }
});

notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;

    if (type === EventType.ACTION_PRESS && pressAction?.id === 'desligar') {
        if (notification?.id) {
            notifee.cancelNotification(notification.id);

            await alarmsService.toggleAlarmStatus({ _id: notification.id });
        }
    }
});

export default notificationsService;