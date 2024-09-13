import React, { useEffect, useState } from 'react';
import { ContainerModeSelect, ContainerPomodoro, ContainerPomodoroButtons, ContainerPomodoroButtonsStartButton, ContainerPomodoroButtonsStartButtonText, ContainerPomodoroButtonsTimeBox, ContainerPomodoroButtonsTimeBoxText, ContainerPomodoroButtonsTitle, ContainerPomodoroTitle, NormalText, SeparatorText, Title } from './styled';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { Entypo, FontAwesome } from '@expo/vector-icons';

import PomodorTimerPicker from '../PomodoroTimerPicker';

interface PomodoroScreenProps {
    setModalSelectVisible: (visible: boolean) => void;
}

const PomodoroScreen = ({ setModalSelectVisible }: PomodoroScreenProps) => {
    const theme = useTheme();

    const [hour, setHour] = useState<number>(0);
    const [minute, setMinute] = useState<number>(0);
    const [second, setSecond] = useState<number>(0);

    const [restHour, setRestHour] = useState<number>(0);
    const [restMinute, setRestMinute] = useState<number>(0);
    const [restSecond, setRestSecond] = useState<number>(0);

    const calculateRestTime = (studyTimeInSeconds: number) => {
        const restTimeInSeconds = Math.floor(studyTimeInSeconds * 0.3);

        const restHour = Math.floor(restTimeInSeconds / 3600);
        const restMinute = Math.floor((restTimeInSeconds % 3600) / 60);
        const restSecond = restTimeInSeconds % 60;

        setRestHour(restHour);
        setRestMinute(restMinute);
        setRestSecond(restSecond);
    };

    useEffect(() => {
        const calculatedHour = hour * 3600;
        const calculatedMinute = minute * 60;
        const calculatedSecond = second;
        const studyTimeInSeconds = calculatedHour + calculatedMinute + calculatedSecond;

        calculateRestTime(studyTimeInSeconds);
    }, [hour, minute, second]);

    return (
        <ContainerPomodoro>
            <ContainerPomodoroTitle>
                <ContainerModeSelect onPress={() => { setModalSelectVisible(true) }}>
                    <Title>Pomodoro</Title>
                    <Entypo name="chevron-down" size={RFValue(28)} color={theme.colors.text} />
                </ContainerModeSelect>
                <NormalText>
                    Crie seu pomodoro aqui...{'\n'}{'\n'}
                    Adicione os tempos desejados abaixo, que iremos monitorar para você!
                </NormalText>
            </ContainerPomodoroTitle>

            <ContainerPomodoroButtons>
                <ContainerPomodoroButtonsTitle>Tempo de estudo:</ContainerPomodoroButtonsTitle>
                <PomodorTimerPicker setHour={setHour} setMinute={setMinute} setSecond={setSecond} />

                <ContainerPomodoroButtonsTitle style={{ marginTop: RFValue(32) }}>Tempo de descanso:</ContainerPomodoroButtonsTitle>
                <ContainerPomodoroButtonsTimeBox>
                    <ContainerPomodoroButtonsTimeBoxText>{restHour.toString().padStart(2, "0")}</ContainerPomodoroButtonsTimeBoxText>
                    <SeparatorText>:</SeparatorText>
                    <ContainerPomodoroButtonsTimeBoxText>{restMinute.toString().padStart(2, "0")}</ContainerPomodoroButtonsTimeBoxText>
                    <SeparatorText>:</SeparatorText>
                    <ContainerPomodoroButtonsTimeBoxText>{restSecond.toString().padStart(2, "0")}</ContainerPomodoroButtonsTimeBoxText>
                </ContainerPomodoroButtonsTimeBox>
                {/* <PomodorTimerPicker setHour={setRestHour} setMinute={setRestMinute} setSecond={setRestSecond} /> */}

                <ContainerPomodoroButtonsStartButton onPress={() => {
                    console.log(`Study ${hour} hours, ${minute} minutes and ${second} seconds`);
                    console.log(`Rest ${restHour} hours, ${restMinute} minutes and ${restSecond} seconds`);
                }}>
                    <ContainerPomodoroButtonsStartButtonText>COMEÇAR</ContainerPomodoroButtonsStartButtonText>
                    <FontAwesome style={{ position: 'absolute', right: RFValue(16) }} name='check' size={RFValue(20)} color={theme.colors.bgColor} />
                </ContainerPomodoroButtonsStartButton>
            </ContainerPomodoroButtons>
        </ContainerPomodoro>
    )
}

export default PomodoroScreen