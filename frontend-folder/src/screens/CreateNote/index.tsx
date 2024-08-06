import React, { useState } from 'react'
import { Container, ContainerInputs, ContainerInputsTitle, ContainerInputsView, InputContent } from './styled';
import { useNavigation } from '@react-navigation/native';
import { PropsStack } from '../../routes';
import { useTheme } from 'styled-components';
import noteService from '../../services/noteService';
import { Alert } from 'react-native';
import DefaultHeader from '../../components/common/DefaultHeader/Index';
import Loader from '../Loader';

const CreateNote = () => {
  const theme = useTheme();
  const navigation = useNavigation<PropsStack>();
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveNote = async () => {
    const title = noteTitle.trim();
    const content = noteContent.trim();

    if (title === "") {
      alert("Digite um título para a nota");
      return;

    } else if (content === "") {
      alert("Digite um conteúdo para a nota");
      return;

    } else {
      setIsLoading(true);

      const params = { title, content };

      const { status } = await noteService.addNote(params);

      if (status === 201) {
        Alert.alert("Sucesso", "Nota cadastrado com sucesso!");

        navigation.navigate("Notes", { newNote: true });
      }

      setIsLoading(false);
    }
  }

  if (isLoading) return <Loader type='save' />

  return (
    <Container>
      <DefaultHeader title={noteTitle} setTitle={setNoteTitle} handleSave={handleSaveNote} placeholderText='Título da nota...' marginBottom={30} />

      <ContainerInputs>
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

export default CreateNote;