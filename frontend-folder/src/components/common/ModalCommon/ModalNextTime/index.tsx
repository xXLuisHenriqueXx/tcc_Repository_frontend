import React from 'react';
import { ContainerButtons, ContinueButton, ContinueButtonText, FinishButton, FinishButtonText, ModalTitle, ModalTitleHighlight } from './styled';
import * as Haptics from 'expo-haptics';
import { Check, X } from 'lucide-react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

interface ModalNextTimeProps {
    isStudyTime: boolean;
    handleNext: () => void;
    handleFinish: () => void;
}

const ModalNextTime = ({ isStudyTime, handleNext, handleFinish }: ModalNextTimeProps) => {
    const theme = useTheme();

    return (
        <>
            <ModalTitle>
                <ModalTitleHighlight>{isStudyTime ? 'Estudo finalizado!' : 'Descanso finalizado!'}</ModalTitleHighlight>
                {'\n'}O que deseja fazer?
            </ModalTitle>

            <ContainerButtons>
                <ContinueButton onPress={() => {
                    Haptics.selectionAsync();

                    handleNext();
                }}>
                    <ContinueButtonText>Continuar</ContinueButtonText>
                    <Check size={RFValue(20)} color={theme.colors.bgColor} style={{ position: "absolute", right: RFValue(16) }} />
                </ContinueButton>

                <FinishButton onPress={() => {
                    Haptics.selectionAsync();

                    handleFinish();
                }}>
                    <FinishButtonText>Finalizar</FinishButtonText>
                    <X size={RFValue(20)} color={theme.colors.highlightColor} style={{ position: "absolute", right: RFValue(16) }} />
                </FinishButton>
            </ContainerButtons>
        </>
    )
}

export default ModalNextTime