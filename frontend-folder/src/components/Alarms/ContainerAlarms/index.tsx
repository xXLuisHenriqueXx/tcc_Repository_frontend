import React, { useState, useRef, useEffect } from 'react';
import { View, Animated, Easing } from 'react-native';
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

    const translateX = useRef(new Animated.Value(0)).current;
    const shakeAnimation = useRef(new Animated.Value(0)).current;

    const trackColor = { false: theme.colors.trackColorInactive, true: theme.colors.trackColorActive };

    const handleDelete = async () => {
        Animated.timing(translateX, {
            toValue: 500, // Valor para mover o container para a direita
            duration: 100, // Duração da animação
            easing: Easing.ease,
            useNativeDriver: true,
        }).start(async () => {
            await deleteAlarm(alarm);
        });
    };

    useEffect(() => {
        if (modalVisible) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(shakeAnimation, {
                        toValue: 1,
                        duration: 200,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                    Animated.timing(shakeAnimation, {
                        toValue: -1,
                        duration: 200,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                    Animated.timing(shakeAnimation, {
                        toValue: 0,
                        duration: 200,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        } else {
            shakeAnimation.setValue(0);
        }
    }, [modalVisible]);

    return (
        <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
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
                        await toggleAlarmStatus(alarm._id, alarm.status);
                    }}
                    value={switchEnabled}
                />

                <ModalDelete
                    item={alarm}
                    deleteItem={handleDelete}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                />
            </ContainerAlarmView>
        </Animated.View>
    );
};

export default ContainerAlarm;