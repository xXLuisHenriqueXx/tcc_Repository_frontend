import React from 'react'
import { Modal } from 'react-native'
import { ContainerView, ModalButton, ModalButtonText, ModalText, ModalTitle, ModalView } from './styled'
import { Achievement } from '../../../entities/Achievement';

interface ModalInfoProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    selected: Achievement | undefined;
    setSelected: (selected: Achievement) => void;
}

const ModalInfo = ({ modalVisible, setModalVisible, selected, setSelected }: ModalInfoProps) => {
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
                        {selected?.title}
                    </ModalTitle>

                    <ModalText>
                        {selected?.description}
                    </ModalText>
                    <ModalText>
                        {selected?.expGiven} pontos de experiência.
                    </ModalText>

                    <ModalButton onPress={() => setModalVisible(!modalVisible)}>
                        <ModalButtonText>Fechar</ModalButtonText>
                    </ModalButton>
                </ModalView>
            </ContainerView>
        </Modal>
    )
}

export default ModalInfo;