import React from 'react';
import { ButtonNext, ButtonPrevious, ContainerControllers, Dot, DotsContainer } from './styled';
import { useTheme } from 'styled-components';
import * as Haptics from 'expo-haptics';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';

interface WelcomeControllersProps {
    currentScreen: number;
    handleNext: () => void;
    handlePrevious: () => void;
}

const WelcomeControllers = ({ currentScreen, handleNext, handlePrevious }: WelcomeControllersProps) => {
    const theme = useTheme();

    return (
        <>
            <ContainerControllers>
                <ButtonPrevious onPress={() => {
                    Haptics.selectionAsync();

                    handlePrevious();
                }}>
                    <ArrowLeft size={20} color={theme.colors.highlightColor} />
                </ButtonPrevious>

                <DotsContainer>
                    {[...Array(6)].map((_, index) => (
                        <Dot key={index} active={currentScreen === index} />
                    ))}
                </DotsContainer>

                <ButtonNext onPress={() => {
                    Haptics.selectionAsync();

                    handleNext();
                }}>
                    <ArrowRight size={20} color={theme.colors.bgColor} />
                </ButtonNext>
            </ContainerControllers>
        </>
    )
}

export default WelcomeControllers;