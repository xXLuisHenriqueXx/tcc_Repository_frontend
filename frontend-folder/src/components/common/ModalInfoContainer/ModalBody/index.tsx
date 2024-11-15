import React, { useState } from 'react';
import { ContainerModal, IconButton } from './styled';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import * as Haptics from 'expo-haptics';
import { Trash2, X } from 'lucide-react-native';

interface ModalBodyProps {
    setModalVisible: (visible: boolean) => void;
    setModalDeleteVisible: (visible: boolean) => void;
}

const ModalBody = ({ setModalVisible, setModalDeleteVisible }: ModalBodyProps) => {
    const theme = useTheme();

    const [isClosing, setIsClosing] = useState<boolean>(false);

    return (
        <ContainerModal
            transition={{ type: "timing", duration: 200 }}
            from={{ opacity: isClosing ? 1 : 0 }}
            animate={{ opacity: isClosing ? 0 : 1 }}
        >
            <IconButton onPress={() => {
                Haptics.selectionAsync();

                setModalVisible(false)
                setModalDeleteVisible(true)
            }}>
                <Trash2 size={RFValue(20)} color={theme.colors.bgColor} strokeWidth={RFValue(2)} />
            </IconButton>

            <IconButton onPress={() => {
                Haptics.selectionAsync();

                setIsClosing(true)
                setTimeout(() => setModalVisible(false), 200);
            }}>
                <X size={RFValue(20)} color={theme.colors.bgColor} strokeWidth={RFValue(2)} />
            </IconButton>
        </ContainerModal>
    )
}

export default ModalBody;