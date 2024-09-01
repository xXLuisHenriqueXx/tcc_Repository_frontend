import React, { useEffect, useState } from 'react'
import { Container, ContainerInputs, ContainerInputsTitle, ContainerInputsView, InputContent } from './styled';
import { useNavigation } from '@react-navigation/native';
import { PropsNavigationStack, PropsStack } from '../../routes';
import { useTheme } from 'styled-components';
import noteService from '../../services/noteService';
import { Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import DefaultHeader from '../../components/common/DefaultHeader/Index';
import Loader from '../Loader';

type Props = NativeStackScreenProps<PropsNavigationStack, 'UpdateNote'>

const UpdateNote = ({ route }: Props) => {
    const theme = useTheme();
    const navigation = useNavigation<PropsStack>();
    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { noteInfo } = route.params || {};

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
            const title = noteTitle.trim();
            const content = noteContent.trim();

            if (title === "") {
                Alert.alert("Aviso", "Digite um título para a nota!");
                return;

            } else if (content === "") {
                Alert.alert("Aviso", "Digite um conteúdo para a nota!");
                return;
            } else {
                const params = { _id: noteInfo?._id, title: title, content: content };

                const response = await noteService.updateNote(params);

                if (response.status === 200) {
                    navigation.navigate("Notes", { newNote: true });
                }
            }
        } catch (error) {
            Alert.alert("Erro", "Erro ao atualizar nota!");
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
                transition={{
                    type: 'timing',
                    duration: 200,
                }}
            >
                <ContainerInputsView>
                    <ContainerInputsTitle>Conteúdo da nota</ContainerInputsTitle>
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