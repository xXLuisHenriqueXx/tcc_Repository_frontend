import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';

import Navbar from '../../components/common/Navbar';
import BotaoAdd from '../../components/common/BotaoAdd';
import ModalSelect from '../../components/common/ModalSelect';
import AlarmScreen from '../../components/Alarms/AlarmsScreen';
import PomodoroScreen from '../../components/Alarms/PomodoroScreen';
import { PropsNavigationStack, PropsStack } from '../../routes';

type Props = NativeStackScreenProps<PropsNavigationStack, 'Alarms'>;

const Alarms = ({ route }: Props) => {
    const navigation = useNavigation<PropsStack>();
    const theme = useTheme();

    const { newAlarm } = route.params || {};
    const [screen, setScreen] = useState<"alarm" | "pomodoro">("alarm");
    const [modalSelectVisible, setModalSelectVisible] = useState<boolean>(false);

    const navigateToCreateAlarm = () => {
        navigation.navigate('CreateAlarm');
    };

    return (
        <LinearGradient
            colors={theme.colors.bgMainColor}
            style={{ flex: 1 }}
        >
            {screen === "alarm" ?
                <AlarmScreen
                    newAlarm={newAlarm}
                    setModalSelectVisible={setModalSelectVisible}
                />
                :
                <PomodoroScreen
                    setModalSelectVisible={setModalSelectVisible}
                />
            }
            {screen === "alarm" && <BotaoAdd navigate={navigateToCreateAlarm} />}
            <Navbar screen='Alarms' />
            <ModalSelect
                modalVisible={modalSelectVisible}
                setModalVisible={setModalSelectVisible}
                screen={screen}
                setScreen={setScreen}
            />
        </LinearGradient >
    )
}

export default Alarms;