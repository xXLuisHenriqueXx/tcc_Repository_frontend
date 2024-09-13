import React from 'react';
import { Modal } from 'react-native';
import { ContainerButtons, ContainerView, ModalTitle, ModalTitleDestaque, ModalView, NoButton, NoButtonText, YesButton, YesButtonText } from './styled';

interface ModalDeleteProps {
    item: any
    deleteItem: (item: any) => void;
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
}

const ModalDelete = ({ item, deleteItem, modalVisible, setModalVisible }: ModalDeleteProps) => {
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
                        Tem certeza que deseja excluir o item "<ModalTitleDestaque>{item.title}</ModalTitleDestaque>"?
                    </ModalTitle>

                    <ContainerButtons>
                        <NoButton
                            onPress={() => setModalVisible(false)}
                        >
                            <NoButtonText>Não</NoButtonText>
                        </NoButton>

                        <YesButton
                            onPress={() => {
                                deleteItem(item._id);
                                setModalVisible(false);
                            }}
                        >
                            <YesButtonText>Sim</YesButtonText>
                        </YesButton>
                    </ContainerButtons>
                </ModalView>
            </ContainerView>
        </Modal>
    )
}

export default ModalDelete;