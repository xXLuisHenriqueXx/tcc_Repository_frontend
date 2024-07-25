import React, { useEffect, useState } from 'react'
import { BackButton, Container, ContainerHeader, ContainerInputs, ContainerInputsView, Input, InputTitleContainer, InputTitle, Title, InputContent } from './styled';
import { useNavigation } from '@react-navigation/native';
import { PropsNavigationStack, PropsStack } from '../../routes';
import { Feather } from "@expo/vector-icons"
import { useTheme } from 'styled-components';
import noteService from '../../services/noteService';
import { Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ButtonAdd } from '../../components/common/DefaultHeader/styled';
import DefaultHeader from '../../components/common/DefaultHeader/Index';

type Props = NativeStackScreenProps<PropsNavigationStack, 'UpdateNote'>

const UpdateNote = ({ route }: Props) => {
    const theme = useTheme();
    const navigation = useNavigation<PropsStack>();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const { noteInfo } = route.params || {};

    const handleUpdateNote = async () => {
        const params = { _id: noteInfo?._id, title: title, content: content };

        const response = await noteService.updateNote(params);

        if (response.status === 200) {
            Alert.alert("Sucesso", "Nota atualizada com sucesso!");

            navigation.navigate("Notes", { newNote: true });
        }
    }

    const handleSetInfos = async () => {
        setTitle(noteInfo?.title || "")
        setContent(noteInfo?.title || "")
    }

    useEffect(() => {
        handleSetInfos();
    }, []);

    return (
        <Container>
            <DefaultHeader title={title} setTitle={setTitle} handleSave={handleUpdateNote} placeholderText='' />

            <ContainerInputs>
                <ContainerInputsView>
                    <InputContent
                        style={{ textAlignVertical: "top" }}
                        placeholder="Digite o conteúdo"
                        placeholderTextColor={theme.colors.textInactive}
                        value={content}
                        onChangeText={setContent}
                        multiline
                    />
                </ContainerInputsView>
            </ContainerInputs>
        </Container>
    )
}

export default UpdateNote;