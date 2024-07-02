import React, { useState } from 'react'
import { Switch, View } from 'react-native';
import { ContainerAlarmView, DeleteButton, SwitchButton, TextDiasAlarm, TextHorarioAlarm, TextMaterialAlarm } from './styled';
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components';
import { Alarm } from '../../../entities/Alarm';
import ModalDelete from '../../common/ModalDelete';

interface ContainerAlarmProps {
    alarm: Alarm;
    deleteAlarm: (alarm: Alarm) => Promise<void>
    toggleAlarmStatus: (_id: string, status: boolean) => Promise<void>;
}

const ContainerAlarm = ({ alarm, deleteAlarm, toggleAlarmStatus }: ContainerAlarmProps) => {
    const theme = useTheme();

    const [switchEnabled, setSwitchEnabled] = useState(alarm.status);
    const [modalVisible, setModalVisible] = useState(false);

    const trackColor = { false: theme.colors.trackColorInactive, true: theme.colors.trackColorActive };
    const iconColor = switchEnabled ? theme.colors.text : theme.colors.textInactive;

    return (
        <ContainerAlarmView switchEnabled={switchEnabled}>
            <SwitchButton
                style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                trackColor={trackColor}
                thumbColor={theme.colors.thumbColor}
                onValueChange={async (newValue) => {
                    setSwitchEnabled(newValue);
                    await toggleAlarmStatus(alarm._id, newValue);
                }}
                value={switchEnabled}
            />

            <DeleteButton
                activeOpacity={0.8}
                onPress={() => setModalVisible(true)}
            >
                <Feather name="x" size={24} color={iconColor} />
            </DeleteButton>
            <View>
                <TextMaterialAlarm switchEnabled={switchEnabled}>
                    {alarm.title}
                </TextMaterialAlarm>
                <TextHorarioAlarm switchEnabled={switchEnabled}>
                    {alarm.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </TextHorarioAlarm>
                <TextDiasAlarm switchEnabled={switchEnabled}>
                    {alarm.date.toLocaleDateString()}
                </TextDiasAlarm>
            </View>

            <ModalDelete
                item={alarm}
                deleteItem={deleteAlarm}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </ContainerAlarmView>
    )
}

export default ContainerAlarm;