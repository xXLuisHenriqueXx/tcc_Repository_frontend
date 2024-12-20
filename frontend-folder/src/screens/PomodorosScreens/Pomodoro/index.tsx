import React, { useEffect, useState } from 'react';
import { ContainerPomodoro, ContainerPomodoroButtons, ContainerPomodoroButtonsStartButton, ContainerPomodoroButtonsStartButtonText, ContainerPomodoroButtonsTimeBox, ContainerPomodoroButtonsTimeBoxText, ContainerPomodoroButtonsTitle, SeparatorText, Title } from './styled';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Haptics from 'expo-haptics';
import { Check } from 'lucide-react-native';

import { TimePicker } from '../../../components/common/TimePicker';
import ContainerGradient from '../../../components/common/ContainerGradient';
import { useNavigation } from '@react-navigation/native';
import { PropsStack } from '../../../routes';

const Pomodoro = () => {
    const theme = useTheme();
    const navigation = useNavigation<PropsStack>();

    const [hour, setHour] = useState<number>(0);
    const [minute, setMinute] = useState<number>(0);
    const [second, setSecond] = useState<number>(0);

    const [restHour, setRestHour] = useState<number>(0);
    const [restMinute, setRestMinute] = useState<number>(0);
    const [restSecond, setRestSecond] = useState<number>(0);

    useEffect(() => {
        const calculatedHour = hour * 3600;
        const calculatedMinute = minute * 60;
        const calculatedSecond = second;
        const studyTimeInSeconds = calculatedHour + calculatedMinute + calculatedSecond;

        calculateRestTime(studyTimeInSeconds);
    }, [hour, minute, second]);

    const calculateRestTime = (studyTimeInSeconds: number) => {
        const restTimeInSeconds = Math.floor(studyTimeInSeconds * 0.2);

        const restHour = Math.floor(restTimeInSeconds / 3600);
        const restMinute = Math.floor((restTimeInSeconds % 3600) / 60);
        const restSecond = restTimeInSeconds % 60;

        setRestHour(restHour);
        setRestMinute(restMinute);
        setRestSecond(restSecond);
    };

    const navigateToPomodoroRunning = () => {
        const studyTimeInSeconds = hour * 3600 + minute * 60 + second;
        const restTimeInSeconds = restHour * 3600 + restMinute * 60 + restSecond;

        Haptics.selectionAsync();

        navigation.navigate('PomodoroRunning', {
            studyTime: studyTimeInSeconds,
            restTime: restTimeInSeconds
        });
    }

    return (
        <ContainerGradient screen='Pomodoro' >
            <ContainerPomodoro>
                <Title>Pomodoro</Title>

                <ContainerPomodoroButtons>
                    <ContainerPomodoroButtonsTitle>Tempo de estudo:</ContainerPomodoroButtonsTitle>
                    <TimePicker.Root>
                        <TimePicker.List length={24} setPicker={setHour} initialValue={0} />
                        <TimePicker.Separator />
                        <TimePicker.List length={60} setPicker={setMinute} initialValue={25} />
                        <TimePicker.Separator />
                        <TimePicker.List length={60} setPicker={setSecond} initialValue={0} />
                    </TimePicker.Root>

                    <ContainerPomodoroButtonsTitle style={{ marginTop: RFValue(40) }}>Tempo de descanso:</ContainerPomodoroButtonsTitle>
                    <ContainerPomodoroButtonsTimeBox>
                        <ContainerPomodoroButtonsTimeBoxText>{restHour.toString().padStart(2, "0")}</ContainerPomodoroButtonsTimeBoxText>
                        <SeparatorText>:</SeparatorText>
                        <ContainerPomodoroButtonsTimeBoxText>{restMinute.toString().padStart(2, "0")}</ContainerPomodoroButtonsTimeBoxText>
                        <SeparatorText>:</SeparatorText>
                        <ContainerPomodoroButtonsTimeBoxText>{restSecond.toString().padStart(2, "0")}</ContainerPomodoroButtonsTimeBoxText>
                    </ContainerPomodoroButtonsTimeBox>

                    <ContainerPomodoroButtonsStartButton onPress={navigateToPomodoroRunning}>
                        <ContainerPomodoroButtonsStartButtonText>COMEÇAR</ContainerPomodoroButtonsStartButtonText>
                        <Check style={{ position: 'absolute', right: RFValue(16) }} size={RFValue(20)} color={theme.colors.bgColor} strokeWidth={RFValue(2)} />
                    </ContainerPomodoroButtonsStartButton>
                </ContainerPomodoroButtons>
            </ContainerPomodoro>
        </ContainerGradient>
    )
}

export default Pomodoro;