import React, { useState } from 'react'
import { Container, ContainerInputs, ContainerInputsView, InputContent } from './styled';
import { useNavigation } from '@react-navigation/native';
import { PropsStack } from '../../routes';
import { Feather } from "@expo/vector-icons"
import { useTheme } from 'styled-components';
import noteService from '../../services/noteService';
import { Alert } from 'react-native';
import DefaultHeader from '../../components/common/DefaultHeader/Index';

const CreateNote = () => {
  const theme = useTheme();
  const navigation = useNavigation<PropsStack>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSaveNote = async () => {
    if (title === "") {
      alert("Digite um título para a nota");
      return;

    } else if (content === "") {
      alert("Digite um conteúdo para a nota");
      return;

    } else {
      const params = { title, content };

      const { status } = await noteService.addNote(params);

      if (status === 201) {
        Alert.alert("Sucesso", "Nota cadastrado com sucesso!");

        navigation.navigate("Notes", { newNote: true });
      }
    }
  }

  return (
    <Container>
      <DefaultHeader title={title} setTitle={setTitle} handleSave={handleSaveNote} placeholderText='Título da nota...' />

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

export default CreateNote;