import React, { useState } from 'react'
import { Switch } from 'react-native';
import { ContainerAlarmView, DeleteButton, TextDiasAlarm, TextHorarioAlarm, TextMaterialAlarm } from './styled';
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components';
import { Alarm } from '../../../entities/Alarm';
import { View } from 'react-native-reanimated/lib/typescript/Animated';

interface ContainerAlarmProps {
    alarm: Alarm;
    deleteAlarm: (alarm: Alarm) => Promise<void>
    toggleAlarmStatus: (_id: string, status: boolean) => Promise<void>;
}

const ContainerAlarm = ({ alarm, deleteAlarm, toggleAlarmStatus }: ContainerAlarmProps) => {
    const theme = useTheme();

    const [switchEnabled, setSwitchEnabled] = useState(alarm.status);
    const [modalVisible, setModalVisible] = useState(false);

    const trackColor = {false: theme.colors.trackColorInactive, true: theme.colors.trackColorActive};
    const thumbColor = switchEnabled ? theme.colors.thumbColorActive : theme.colors.thumbColorInactive;
    const iconColor = switchEnabled ? theme.colors.text : theme.colors.textInactive;

    return (
        <ContainerAlarmView switchEnabled={switchEnabled}>
            <Switch 
                style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                trackColor={ trackColor }
                thumbColor={ thumbColor }
                onValueChange={async (newValue) => {
                    setSwitchEnabled(newValue);
                    await toggleAlarmStatus(alarm._id, newValue);
                }}
                value={switchEnabled}
            />

            <DeleteButton onPress={() => setModalVisible(true)}>
                <Feather name="x" size={24} color={iconColor} />
            </DeleteButton>
            <View>
                <TextMaterialAlarm switchEnabled={switchEnabled}>
                    {alarm.title}
                </TextMaterialAlarm>
                <TextHorarioAlarm switchEnabled={switchEnabled}>
                    {alarm.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}
                </TextHorarioAlarm>
                <TextDiasAlarm switchEnabled={switchEnabled}>
                    {alarm.date.toLocaleTimeString()}
                </TextDiasAlarm>
            </View>
        </ContainerAlarmView>
    )
}

export default ContainerAlarm;