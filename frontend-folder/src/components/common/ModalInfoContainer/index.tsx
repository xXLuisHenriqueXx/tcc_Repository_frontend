import React, { useState } from 'react';
import { ContainerModal, IconButton } from './styled';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

interface ModalInfoContainerProps {
    setModalVisible: (visible: boolean) => void;
    setModalDeleteVisible: (visible: boolean) => void;
}

const ModalInfoContainer = ({ setModalVisible, setModalDeleteVisible }: ModalInfoContainerProps) => {
    const theme = useTheme();

    const [isClosing, setIsClosing] = useState(false);

    return (
        <ContainerModal
            transition={{ type: "timing", duration: 200 }}
            from={{ opacity: isClosing ? 1 : 0 }}
            animate={{ opacity: isClosing ? 0 : 1 }}
        >
            <IconButton onPress={() => {
                setModalVisible(false)
            }}>
                <AntDesign name="infocirlceo" size={RFValue(20)} color={theme.colors.bgColor} />
            </IconButton>

            <IconButton onPress={() => {
                setModalVisible(false)
                setModalDeleteVisible(true)
            }}>
                <Ionicons name="trash-bin-outline" size={RFValue(20)} color={theme.colors.bgColor} />
            </IconButton>

            <IconButton onPress={() => {
                setIsClosing(true)
                setTimeout(() => setModalVisible(false), 200);
            }}>
                <AntDesign name="closecircleo" size={RFValue(20)} color={theme.colors.bgColor} />
            </IconButton>
        </ContainerModal>
    )
}

export default ModalInfoContainer;