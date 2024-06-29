import React from 'react'
import { Modal } from 'react-native'
import { useTheme } from 'styled-components'
import { ContainerButtons, ContainerView, ModalTitle, ModalTitleDestaque, NoButton, NoButtonText, YesButton, YesButtonText } from './styled'
import { LinearGradient } from 'expo-linear-gradient'
import { RFValue } from 'react-native-responsive-fontsize'

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
                <LinearGradient
                    colors={theme.colors.bgColor}
                    style={
                        {
                            width: "90%",
                            height: RFValue(180),
                            alignItems: "center",
                            paddingTop: RFValue(20),
                            borderRadius: RFValue(10),
                            borderWidth: RFValue(1),
                            borderColor: theme.colors.bdColor
                        }
                    }
                >
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
                </LinearGradient>
            </ContainerView>
        </Modal>
    )
}

export default ModalDelete