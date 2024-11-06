import React from 'react';
import { ButtonNext, ButtonPrevious, ContainerControllers, Dot, DotsContainer } from './styled';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import { useTheme } from 'styled-components';

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
                <ButtonPrevious onPress={handlePrevious}>
                    <ArrowLeft size={20} color={theme.colors.highlightColor} />
                </ButtonPrevious>

                <DotsContainer>
                    {[...Array(6)].map((_, index) => (
                        <Dot key={index} active={currentScreen === index} />
                    ))}
                </DotsContainer>

                <ButtonNext onPress={handleNext}>
                    <ArrowRight size={20} color={theme.colors.bgColor} />
                </ButtonNext>
            </ContainerControllers>
        </>
    )
}

export default WelcomeControllers;