import React from 'react';
import { ContainerButtons, ContainerView, ContinueButton, ContinueButtonText, FinishButton, FinishButtonText, ModalTitle, ModalTitleHighlight, ModalView } from './styled';
import { Modal } from 'react-native';

interface ModalNextTimeProps {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
    isStudyTime: boolean;
    handleNext: () => void;
    handleFinish: () => void;
}

const ModalNextTime = ({ showModal, setShowModal, isStudyTime, handleNext, handleFinish }: ModalNextTimeProps) => {
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
                setShowModal(!showModal);
            }}
        >
            <ContainerView
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'timing', duration: 300 }}
                exit={{ opacity: 0 }}
                exitTransition={{ type: 'timing', duration: 300 }}
            >
                <ModalView>
                    <ModalTitle>
                        <ModalTitleHighlight>{isStudyTime ? 'Estudo finalizado!' : 'Descanso finalizado!'}</ModalTitleHighlight> 
                        ${'\n'}O que deseja fazer?
                    </ModalTitle>

                    <ContainerButtons>
                        <FinishButton onPress={handleFinish}>
                            <FinishButtonText>Finalizar</FinishButtonText>
                        </FinishButton>

                        <ContinueButton onPress={handleNext}>
                            <ContinueButtonText>Continuar</ContinueButtonText>
                        </ContinueButton>
                    </ContainerButtons>
                </ModalView>
            </ContainerView>
        </Modal>
    )
}

export default ModalNextTime;