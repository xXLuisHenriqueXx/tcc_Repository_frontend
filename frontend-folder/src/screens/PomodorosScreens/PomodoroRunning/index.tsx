import React, { useEffect, useState } from 'react';
import { Container, ContainerPomodoro, TimerButton, TimerButtonText, TimerContainer, TimerText, TimerTextSmall, TimerTitle } from './styled';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import { Check } from 'lucide-react-native';

import { PropsNavigationStack, PropsStack } from '../../../routes';
import ModalNextTime from '../../../components/Pomodoro/ModalNextTime';
import BackButton from '../../../components/common/BackButton';


type Props = NativeStackScreenProps<PropsNavigationStack, 'PomodoroRunning'>;

const PomodoroRunning = ({ route }: Props) => {
    const theme = useTheme();
    const navigation = useNavigation<PropsStack>();

    const { studyTime, restTime } = route.params;
    const [time, setTime] = useState(studyTime);
    const [isStudyTime, setIsStudyTime] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [sound, setSound] = useState<Audio.Sound | null>(null);

    const formatTime = (timeInSeconds: number) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const playSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
            require('../../../assets/sounds/sound_alarmPomodo.mp3')
        );

        setSound(sound);
        await sound.playAsync();
    }

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime === 0) {
                    clearInterval(timer);
                    setShowModal(true);
                    playSound();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isStudyTime, restTime, studyTime]);

    const handleNext = () => {
        setShowModal(false);
        setIsStudyTime(!isStudyTime);
        setTime(isStudyTime ? restTime : studyTime);
    };

    const handleFinish = () => {
        setShowModal(false);
        navigation.goBack();
    };

    return (
        <Container>
            <BackButton />
            <ContainerPomodoro
                from={{ opacity: 0, translateY: 100 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 300 }}
            >
                <TimerContainer>
                    <TimerTitle>{isStudyTime ? 'Está na hora de estudar!' : 'Está na hora de descansar!'}</TimerTitle>
                    <TimerText>{formatTime(time)}</TimerText>
                    <TimerTextSmall>
                        {isStudyTime
                            ? 'Você está na etapa de estudo, aproveite para adquirir todo o conhecimento possível, até o temporizador alcançar o fim!'
                            : 'Você está na etapa de descanso, aproveite para relaxar e recarregar as energias, até o temporizador alcançar o fim!'}
                    </TimerTextSmall>

                </TimerContainer>

                <TimerButton onPress={() => {
                    Haptics.selectionAsync();

                    handleFinish();
                }}>
                    <TimerButtonText>FINALIZAR</TimerButtonText>
                    <Check style={{ position: 'absolute', right: RFValue(16) }} size={RFValue(20)} color={theme.colors.bgColor} strokeWidth={RFValue(2)} />
                </TimerButton>
            </ContainerPomodoro>

            <ModalNextTime
                showModal={showModal}
                setShowModal={setShowModal}
                isStudyTime={isStudyTime}
                handleNext={handleNext}
                handleFinish={handleFinish}
            />
        </Container>
    )
}

export default PomodoroRunning;