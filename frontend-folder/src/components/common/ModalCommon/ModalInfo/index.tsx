import React from 'react';
import { ContainerExperience, ModalButton, ModalButtonText, ModalText, ModalTitle } from './styled';
import * as Haptics from 'expo-haptics';

import { Achievement } from '../../../../entities/Achievement';
import { BadgeCheck, X } from 'lucide-react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

interface ModalInfoProps {
    item: Achievement | undefined;
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
}

const ModalInfo = ({ item, modalVisible, setModalVisible }: ModalInfoProps) => {
    const theme = useTheme();

    return (
        <>
            <ModalTitle>
                {item?.title}
            </ModalTitle>

            <ModalText>
                {item?.description}
            </ModalText>
            <ContainerExperience>
                <BadgeCheck size={RFValue(20)} color={theme.colors.highlightColor} style={{ marginRight: RFValue(8) }} />
                <ModalText>{item?.expGiven} pontos de experiência.</ModalText>
            </ContainerExperience>

            <ModalButton onPress={() => {
                Haptics.selectionAsync();

                setModalVisible(!modalVisible)
            }}>
                <ModalButtonText>Fechar</ModalButtonText>
                <X size={RFValue(20)} color={theme.colors.bgColor} style={{ position: "absolute", right: RFValue(16) }} />
            </ModalButton>
        </>
    )
}

export default ModalInfo;