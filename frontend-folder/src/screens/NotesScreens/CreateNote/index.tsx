import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Container, ContainerInputLine, ContainerInputs, ContainerInputsView, InputContent } from './styled';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import * as Haptics from 'expo-haptics';

import Loader from '../../Loader';
import DefaultHeader from '../../../components/common/DefaultHeader';
import { PropsStack } from '../../../routes';
import noteService from '../../../services/noteService';

const CreateNote = () => {
  const theme = useTheme();
  const navigation = useNavigation<PropsStack>();

  const [noteTitle, setNoteTitle] = useState<string>("");
  const [noteContent, setNoteContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSaveNote = async () => {
    setIsLoading(true);

    try {
      const trimmedTitle = noteTitle.trim();
      const trimmedContent = noteContent.trim();

      if (!trimmedTitle || !trimmedContent) {
        Alert.alert("Aviso", "Preencha todos os campos!");
        return;

      } else {
        const params = { title: trimmedTitle, content: trimmedContent };

        const { status } = await noteService.addNote(params);

        if (status === 201) {
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
        Alert.alert("Erro", "Erro ao salvar a nota!");
    }
    } finally {
      setIsLoading(false);
    }

  }

  if (isLoading) return <Loader type='save' />

  return (
    <Container>
      <DefaultHeader title={noteTitle} setTitle={setNoteTitle} handleSave={handleSaveNote} placeholderText='Título da nota...' marginBottom={30} />

      <ContainerInputs
        from={{ translateY: 300, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ type: 'timing', duration: 200 }}
      >
        <ContainerInputsView>
          <ContainerInputLine />

          <InputContent
            style={{ textAlignVertical: "top" }}
            placeholder="Digite o conteúdo..."
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

export default CreateNote;