import React from 'react'
import { Modal } from 'react-native'
import { useTheme } from 'styled-components'
import { ContainerButtons, ContainerView, ModalTitle, ModalTitleDestaque, ModalView, NoButton, NoButtonText, YesButton, YesButtonText } from './styled'

interface ModalDeleteProps {
    item: any
    deleteItem: (item: any) => void;
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
}

const ModalDelete = ({ item, deleteItem, modalVisible, setModalVisible }: ModalDeleteProps) => {
    const theme = useTheme();

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <ContainerView>
                <ModalView>
                    <ModalTitle>
                        Tem certeza que deseja excluir o item "<ModalTitleDestaque>{item.title}</ModalTitleDestaque>"?
                    </ModalTitle>

                    <ContainerButtons>
                        <NoButton
                            activeOpacity={0.8}
                            onPress={() => setModalVisible(false)}
                        >
                            <NoButtonText>Não</NoButtonText>
                        </NoButton>

                        <YesButton
                            activeOpacity={0.8}
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

export default ModalDelete