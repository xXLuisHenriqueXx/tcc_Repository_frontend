import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Container, ContainerInputLine, ContainerInputs, ContainerInputsView, InputContent } from './styled';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';

import Loader from '../../Loader';
import DefaultHeader from '../../../components/common/DefaultHeader';
import { PropsNavigationStack, PropsStack } from '../../../routes';
import noteService from '../../../services/noteService';

type Props = NativeStackScreenProps<PropsNavigationStack, 'UpdateNote'>

const UpdateNote = ({ route }: Props) => {
    const theme = useTheme();
    const navigation = useNavigation<PropsStack>();
    const { noteInfo } = route.params || {};

    const [noteTitle, setNoteTitle] = useState<string>("");
    const [noteContent, setNoteContent] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        handleSetInfos();
    }, []);

    const handleSetInfos = async () => {
        setNoteTitle(noteInfo?.title || "")
        setNoteContent(noteInfo?.content || "")
    }

    const handleUpdateNote = async () => {
        setIsLoading(true);

        try {
            const trimmedtitle = noteTitle.trim();
            const trimmedContent = noteContent.trim();

            if (!trimmedtitle || !trimmedContent) {
                Alert.alert("Aviso", "Preencha todos os campos!");
                return;

            } else {
                const params = { _id: noteInfo?._id, title: trimmedtitle, content: trimmedContent };

                const response = await noteService.updateNote(params);

                if (response.status === 200) {
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

                    navigation.navigate("Notes", { newNote: true });
                }
            }
        } catch (error: any) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

            if (error.response && error.response.data && error.response.data.errors) {
                const errorMessages = error.response.data.errors.map((err: any) => err.message).join('\n');
                Alert.alert("Erro", errorMessages);
            } else {
                Alert.alert("Erro", "Erro ao atualizar a nota!");
            }
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) return <Loader type='save' />

    return (
        <Container>
            <DefaultHeader title={noteTitle} setTitle={setNoteTitle} handleSave={handleUpdateNote} placeholderText='Título da nota...' marginBottom={30} />

            <ContainerInputs
                from={{ translateY: 300, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{ type: 'timing', duration: 200 }}
            >
                <ContainerInputsView>
                    <ContainerInputLine />

                    <InputContent
                        style={{ textAlignVertical: "top" }}
                        placeholder="Digite o conteúdo"
                        placeholderTextColor={theme.colors.textInactive}
                        value={noteContent}
                        onChangeText={setNoteContent}
                        multiline
                    />
                </ContainerInputsView>
            </ContainerInputs>
        </Container>
    )
}

export default UpdateNote;