import React from 'react';
import { Modal } from 'react-native';
import { ContainerView } from './styled';

interface ModalScreenProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
}

const ModalScreen = ({ modalVisible, setModalVisible }: ModalScreenProps) => {
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
                
            <ContainerView
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'timing', duration: 300 }}
                exit={{ opacity: 0 }}
                exitTransition={{ type: 'timing', duration: 300 }}
            />
        </Modal>
    )
}

export default ModalScreen;