import React, { useState, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import { ContainerAlarmView, SwitchButton, TextDateAlarm, TextDiasAlarm, TextDiasAlarmHighlight, TextDiasAlarmView, TextHorarioAlarm, TextMaterialAlarm } from './styled';
import { useTheme } from 'styled-components';
import { MotiView } from 'moti';
import * as Haptics from 'expo-haptics';

import { Alarm } from '../../../entities/Alarm';
import getDate from '../../../utils/getDate';
import { PropsStack } from '../../../routes';
import { useNavigation } from '@react-navigation/native';
import { ModalCommon } from '../../common/ModalCommon';

interface ContainerAlarmProps {
  alarm: Alarm;
  deleteAlarm: (alarm: Alarm) => Promise<void>
  toggleAlarmStatus: (_id: string) => Promise<void>;
}

const ContainerAlarm = ({ alarm, deleteAlarm, toggleAlarmStatus }: ContainerAlarmProps) => {
  const theme = useTheme();
  const navigation = useNavigation<PropsStack>();

  const [switchEnabled, setSwitchEnabled] = useState<boolean>(alarm.status);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState<boolean>(false);

  const translateX = useRef(new Animated.Value(0)).current;

  const trackColor = { false: theme.colors.trackColorInactive, true: theme.colors.trackColorActive };

  const hasAnyDayEnabled = (days: { [key: string]: boolean }) => {
    return days && Object.values(days).some(day => day === true);
  };

  const handleDelete = async () => {
    Animated.timing(translateX, {
      toValue: 500,
      duration: 100,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(async () => {
      await deleteAlarm(alarm);

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    });
  };

  const navigateToUpdateAlarm = () => {
    Haptics.selectionAsync();

    navigation.navigate("UpdateAlarm", { alarmInfo: alarm });
  }

  return (
    <>
      <Animated.View style={{ transform: [{ translateX }] }}>
        <MotiView
          transition={{ type: 'timing', duration: 300 }}
          from={{ transform: modalVisible ? [{ scale: 1 }] : [{ scale: 1.05 }], }}
          animate={{ transform: modalVisible ? [{ scale: 1.05 }] : [{ scale: 1 }] }}
        >
          <ContainerAlarmView
            onPress={navigateToUpdateAlarm}
            onLongPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

              setModalVisible(true)
            }}
            switchEnabled={switchEnabled}
          >
            <View style={{ width: '80%' }}>
              <TextMaterialAlarm switchEnabled={switchEnabled} numberOfLines={1} ellipsizeMode='tail'>
                {alarm.title}
              </TextMaterialAlarm>
              <TextHorarioAlarm switchEnabled={switchEnabled}>
                {new Date(alarm.hour).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </TextHorarioAlarm>
              {hasAnyDayEnabled(alarm.days) ? (
                <TextDiasAlarmView>
                  {alarm.days?.sunday ? <TextDiasAlarmHighlight switchEnabled={switchEnabled}>D</TextDiasAlarmHighlight> : <TextDiasAlarm switchEnabled={switchEnabled}>D</TextDiasAlarm>}
                  {alarm.days?.monday ? <TextDiasAlarmHighlight switchEnabled={switchEnabled}>S</TextDiasAlarmHighlight> : <TextDiasAlarm switchEnabled={switchEnabled}>S</TextDiasAlarm>}
                  {alarm.days?.tuesday ? <TextDiasAlarmHighlight switchEnabled={switchEnabled}>T</TextDiasAlarmHighlight> : <TextDiasAlarm switchEnabled={switchEnabled}>T</TextDiasAlarm>}
                  {alarm.days?.wednesday ? <TextDiasAlarmHighlight switchEnabled={switchEnabled}>Q</TextDiasAlarmHighlight> : <TextDiasAlarm switchEnabled={switchEnabled}>Q</TextDiasAlarm>}
                  {alarm.days?.thursday ? <TextDiasAlarmHighlight switchEnabled={switchEnabled}>Q</TextDiasAlarmHighlight> : <TextDiasAlarm switchEnabled={switchEnabled}>Q</TextDiasAlarm>}
                  {alarm.days?.friday ? <TextDiasAlarmHighlight switchEnabled={switchEnabled}>S</TextDiasAlarmHighlight> : <TextDiasAlarm switchEnabled={switchEnabled}>S</TextDiasAlarm>}
                  {alarm.days?.saturday ? <TextDiasAlarmHighlight switchEnabled={switchEnabled}>S</TextDiasAlarmHighlight> : <TextDiasAlarm switchEnabled={switchEnabled}>S</TextDiasAlarm>}
                </TextDiasAlarmView>
              ) : (
                <TextDateAlarm switchEnabled={switchEnabled}>
                  {alarm?.date ? getDate(alarm.date.toString()) : ''}
                </TextDateAlarm>
              )}
            </View>

            <SwitchButton
              style={{ transform: [{ scaleX: 1.05 }, { scaleY: 1.05 }] }}
              trackColor={trackColor}
              thumbColor={theme.colors.thumbColor}
              onValueChange={async (newValue) => {
                Haptics.selectionAsync();

                setSwitchEnabled(newValue);
                await toggleAlarmStatus(alarm._id);
              }}
              value={switchEnabled}
            />

            <ModalCommon.Root modalVisible={modalDeleteVisible} setModalVisible={setModalDeleteVisible}>
              <ModalCommon.Delete item={alarm} deleteItem={handleDelete} setModalVisible={setModalDeleteVisible} />
            </ModalCommon.Root>
          </ContainerAlarmView>

          {modalVisible && <ModalCommon.InfoContainer setModalVisible={setModalVisible} setModalDeleteVisible={setModalDeleteVisible} />}
        </MotiView >
      </Animated.View>
    </>
  );
};

export default ContainerAlarm;