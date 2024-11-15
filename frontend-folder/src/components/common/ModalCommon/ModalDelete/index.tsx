import React from 'react';
import { ContainerButtons, ModalTitle, ModalTitleDestaque, NoButton, NoButtonText, YesButton, YesButtonText } from './styled';
import * as Haptics from 'expo-haptics';

import { Alarm } from '../../../../entities/Alarm';
import { Note } from '../../../../entities/Note';
import { Todo } from '../../../../entities/Todo';
import { Check, X } from 'lucide-react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

interface ModalDeleteProps {
    item: Alarm | Note | Todo | undefined;
    deleteItem: (item: any) => void;
    setModalVisible: (visible: boolean) => void;
};

const ModalDelete = ({ item, setModalVisible, deleteItem }: ModalDeleteProps) => {
    const theme = useTheme();

    return (
        <>
            <ModalTitle>
                Tem certeza que deseja excluir o item "<ModalTitleDestaque>{item?.title}</ModalTitleDestaque>"?
            </ModalTitle>

            <ContainerButtons>
            <YesButton
                    onPress={() => {
                        Haptics.selectionAsync();

                        deleteItem(item?._id);
                        setModalVisible(false);
                    }}
                >
                    <YesButtonText>Sim</YesButtonText>
                    <Check size={RFValue(20)} color={theme.colors.bgColor} style={{ position: "absolute", right: RFValue(16) }} />
                </YesButton>
                
                <NoButton
                    onPress={() => {
                        Haptics.selectionAsync();

                        setModalVisible(false)
                    }}>
                    <NoButtonText>Não</NoButtonText>
                    <X size={RFValue(20)} color={theme.colors.highlightColor} style={{ position: "absolute", right: RFValue(16) }} />
                </NoButton>
            </ContainerButtons>
        </>
    )
}

export default ModalDelete