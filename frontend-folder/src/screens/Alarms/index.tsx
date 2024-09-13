import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import BotaoAdd from '../../components/common/BotaoAdd';
import ModalSelect from '../../components/common/ModalSelect';
import AlarmScreen from '../../components/Alarms/AlarmsScreen';
import PomodoroScreen from '../../components/Alarms/PomodoroScreen';
import { PropsNavigationStack, PropsStack } from '../../routes';
import ContainerGradient from '../../components/common/ContainerGradient';

type Props = NativeStackScreenProps<PropsNavigationStack, 'Alarms'>;

const Alarms = ({ route }: Props) => {
    const navigation = useNavigation<PropsStack>();

    const { newAlarm } = route.params || {};
    const [screen, setScreen] = useState<"alarm" | "pomodoro">("alarm");
    const [modalSelectVisible, setModalSelectVisible] = useState<boolean>(false);

    const navigateToCreateAlarm = () => {
        navigation.navigate('CreateAlarm');
    };

    return (
        <ContainerGradient screen='Alarms'>
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
            <ModalSelect
                modalVisible={modalSelectVisible}
                setModalVisible={setModalSelectVisible}
                screen={screen}
                setScreen={setScreen}
            />
        </ContainerGradient>
    )
}

export default Alarms;