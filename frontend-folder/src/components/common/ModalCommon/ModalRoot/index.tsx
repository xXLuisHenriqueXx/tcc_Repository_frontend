import React from 'react';
import { Modal } from 'react-native';
import { ContainerView, ModalView } from './styled';

interface ModalRootProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    children: React.ReactNode;
}

const ModalRoot = ({ modalVisible, setModalVisible, children }: ModalRootProps) => {
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
            >
                <ModalView>
                    {children}
                </ModalView>
            </ContainerView>
        </Modal>
    )
}

export default ModalRoot;