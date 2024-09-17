import React, { useState, useRef, useEffect } from 'react';
import { View, Animated, Easing } from 'react-native';
import { ContainerAlarmView, SwitchButton, TextDiasAlarm, TextDiasAlarmHighlight, TextDiasAlarmView, TextHorarioAlarm, TextMaterialAlarm } from './styled';
import { useTheme } from 'styled-components';

import ModalDelete from '../../common/ModalDelete';
import ModalInfoContainer from '../../common/ModalInfoContainer';
import { Alarm } from '../../../entities/Alarm';
import { MotiView } from 'moti';
import { RFValue } from 'react-native-responsive-fontsize';

interface ContainerAlarmProps {
  alarm: Alarm;
  deleteAlarm: (alarm: Alarm) => Promise<void>
  toggleAlarmStatus: (_id: string, status: boolean) => Promise<void>;
}

const ContainerAlarm = ({ alarm, deleteAlarm, toggleAlarmStatus }: ContainerAlarmProps) => {
  const theme = useTheme();

  const [switchEnabled, setSwitchEnabled] = useState(alarm.status);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);

  const translateX = useRef(new Animated.Value(0)).current;

  const trackColor = { false: theme.colors.trackColorInactive, true: theme.colors.trackColorActive };

  const handleDelete = async () => {
    Animated.timing(translateX, {
      toValue: 500,
      duration: 100,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(async () => {
      await deleteAlarm(alarm);
    });
  };

  return (
    <Animated.View style={{ transform: [{ translateX }] }}>
      <MotiView
        transition={{type: 'timing', duration: 300}}
        from={{transform: modalVisible ? [{scale: 1}] : [{scale: 1.05}], }}
        animate={{transform: modalVisible ? [{scale: 1.05}] : [{scale: 1}]}}
      >
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
            modalVisible={modalDeleteVisible}
            setModalVisible={setModalDeleteVisible}
          />
        </ContainerAlarmView>
        {modalVisible && <ModalInfoContainer setModalVisible={setModalVisible} setModalDeleteVisible={setModalDeleteVisible} />}
      </MotiView >
    </Animated.View>
  );
};

export default ContainerAlarm;