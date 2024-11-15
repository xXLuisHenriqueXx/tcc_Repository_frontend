import React, { useState } from 'react';
import { ContainerModal, ButtonContainer, ButtonContainerText, ButtonContainerSeparator } from './styled';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import * as Haptics from 'expo-haptics';
import { Trash2, X } from 'lucide-react-native';

interface ModalInfoContainerProps {
    setModalVisible: (visible: boolean) => void;
    setModalDeleteVisible: (visible: boolean) => void;
}

const ModalInfoContainer = ({ setModalVisible, setModalDeleteVisible }: ModalInfoContainerProps) => {
    const theme = useTheme();

    const [isClosing, setIsClosing] = useState<boolean>(false);

    return (
        <ContainerModal
            transition={{ type: "timing", duration: 200 }}
            from={{ opacity: isClosing ? 1 : 0 }}
            animate={{ opacity: isClosing ? 0 : 1 }}
            style={{ elevation: 5 }}
        >
            <ButtonContainer onPress={() => {
                Haptics.selectionAsync();

                setModalVisible(false)
                setModalDeleteVisible(true)
            }}>
                <Trash2 size={RFValue(20)} color={theme.colors.text} strokeWidth={RFValue(2)} />
                <ButtonContainerText>Excluir item</ButtonContainerText>
            </ButtonContainer>

            <ButtonContainerSeparator />

            <ButtonContainer onPress={() => {
                Haptics.selectionAsync();

                setIsClosing(true)
                setTimeout(() => setModalVisible(false), 200);
            }}>
                <X size={RFValue(20)} color={theme.colors.text} strokeWidth={RFValue(2)} />
                <ButtonContainerText>Fechar</ButtonContainerText>
            </ButtonContainer>
        </ContainerModal>
    )
}

export default ModalInfoContainer;