import React, { useState } from 'react';
import { ContainerModal, IconButton } from './styled';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { Info, Trash, X } from 'lucide-react-native';

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
        >
            <IconButton onPress={() => {
                setModalVisible(false)
            }}>
                <Info size={RFValue(20)} color={theme.colors.bgColor} strokeWidth={RFValue(2)} />
            </IconButton>

            <IconButton onPress={() => {
                setModalVisible(false)
                setModalDeleteVisible(true)
            }}>
                <Trash size={RFValue(20)} color={theme.colors.bgColor} strokeWidth={RFValue(2)} />
            </IconButton>

            <IconButton onPress={() => {
                setIsClosing(true)
                setTimeout(() => setModalVisible(false), 200);
            }}>
                <X size={RFValue(20)} color={theme.colors.bgColor} strokeWidth={RFValue(2)} />
            </IconButton>
        </ContainerModal>
    )
}

export default ModalInfoContainer;