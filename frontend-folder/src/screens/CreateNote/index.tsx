import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Container, ContainerInputs, ContainerInputsTitle, ContainerInputsView, InputContent } from './styled';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import Loader from '../Loader';
import DefaultHeader from '../../components/common/DefaultHeader';
import { PropsStack } from '../../routes';
import noteService from '../../services/noteService';

const CreateNote = () => {
  const theme = useTheme();
  const navigation = useNavigation<PropsStack>();
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveNote = async () => {
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
        const params = { title, content };

        const { status } = await noteService.addNote(params);

        if (status === 201) {
          navigation.navigate("Notes", { newNote: true });
        }
      }
    } catch (err) {
      Alert.alert('Erro', 'Erro ao salvar nota');
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
        transition={{
          type: 'timing',
          duration: 200,
        }}
      >
        <ContainerInputsView>
          <ContainerInputsTitle>Conteúdo da nota</ContainerInputsTitle>
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