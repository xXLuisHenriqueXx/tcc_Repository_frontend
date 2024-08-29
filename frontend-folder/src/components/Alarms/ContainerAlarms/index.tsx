import React, { useState } from 'react'
import { View } from 'react-native';
import { ContainerAlarmView, SwitchButton, TextDiasAlarm, TextDiasAlarmHighlight, TextDiasAlarmView, TextHorarioAlarm, TextMaterialAlarm } from './styled';
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

    return (
        <ContainerAlarmView
            onLongPress={() => setModalVisible(true)}
            switchEnabled={switchEnabled}
        >
            <View>
                <TextMaterialAlarm switchEnabled={switchEnabled}>
                    {alarm.title}
                </TextMaterialAlarm>
                <TextHorarioAlarm switchEnabled={switchEnabled}>
                    {new Date(alarm.hour).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </TextHorarioAlarm>
                <TextDiasAlarmView>
                    {alarm.days?.sunday ? <TextDiasAlarmHighlight switchEnabled={switchEnabled}>D</TextDiasAlarmHighlight> : <TextDiasAlarm switchEnabled={switchEnabled}>D</TextDiasAlarm>}
                    {alarm.days?.monday ? <TextDiasAlarmHighlight switchEnabled={switchEnabled}>S</TextDiasAlarmHighlight> : <TextDiasAlarm switchEnabled={switchEnabled}>S</TextDiasAlarm>}
                    {alarm.days?.tuesday ? <TextDiasAlarmHighlight switchEnabled={switchEnabled}>T</TextDiasAlarmHighlight> : <TextDiasAlarm switchEnabled={switchEnabled}>T</TextDiasAlarm>}
                    {alarm.days?.wednesday ? <TextDiasAlarmHighlight switchEnabled={switchEnabled}>Q</TextDiasAlarmHighlight> : <TextDiasAlarm switchEnabled={switchEnabled}>Q</TextDiasAlarm>}
                    {alarm.days?.thursday ? <TextDiasAlarmHighlight switchEnabled={switchEnabled}>Q</TextDiasAlarmHighlight> : <TextDiasAlarm switchEnabled={switchEnabled}>Q</TextDiasAlarm>}
                    {alarm.days?.friday ? <TextDiasAlarmHighlight switchEnabled={switchEnabled}>S</TextDiasAlarmHighlight> : <TextDiasAlarm switchEnabled={switchEnabled}>S</TextDiasAlarm>}
                    {alarm.days?.saturday ? <TextDiasAlarmHighlight switchEnabled={switchEnabled}>S</TextDiasAlarmHighlight> : <TextDiasAlarm switchEnabled={switchEnabled}>S</TextDiasAlarm>}
                </TextDiasAlarmView>
            </View>

            <SwitchButton
                style={{ transform: [{ scaleX: 1.15 }, { scaleY: 1.15 }] }}
                trackColor={trackColor}
                thumbColor={theme.colors.thumbColor}
                onValueChange={async (newValue) => {
                    setSwitchEnabled(newValue);
                    await toggleAlarmStatus(alarm._id, newValue);
                }}
                value={switchEnabled}
            />

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