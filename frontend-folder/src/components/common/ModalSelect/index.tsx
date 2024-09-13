import React from 'react';
import { Modal } from 'react-native';
import { AlarmButton, AlarmButtonText, ContainerButtons, ContainerView, ModalTitle, ModalView, PomodoroButton, PomodoroButtonText } from './styled';

interface ModalSelectProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    screen: string;
    setScreen: (screen: "alarm" | "pomodoro") => void;
}

const ModalSelect = ({ modalVisible, setModalVisible, screen, setScreen }: ModalSelectProps) => {
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <ContainerView
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'timing', duration: 300 }}
            >
                <ModalView>
                    <ModalTitle>
                        Selecione a tela que deseja visualizar:
                    </ModalTitle>

                    <ContainerButtons>
                        <AlarmButton
                            selected={screen}
                            onPress={() => {
                                setScreen("alarm");
                                setModalVisible(false);
                            }}>
                            <AlarmButtonText selected={screen}>Alarmes</AlarmButtonText>
                        </AlarmButton>

                        <PomodoroButton
                            selected={screen}
                            onPress={() => {
                                setScreen("pomodoro");
                                setModalVisible(false);
                            }}>
                            <PomodoroButtonText selected={screen}>Pomodoro</PomodoroButtonText>
                        </PomodoroButton>
                    </ContainerButtons>
                </ModalView>
            </ContainerView>
        </Modal>
    )
}

export default ModalSelect;