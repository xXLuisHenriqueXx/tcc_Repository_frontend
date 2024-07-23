import React, { useState } from 'react'
import { BackButton, Container, ContainerHeader, ContainerInputs, ContainerInputsView, Input, InputTitleContainer, InputTitle, Title, InputContent } from './styled';
import { useNavigation } from '@react-navigation/native';
import { PropsStack } from '../../routes';
import { Feather } from "@expo/vector-icons"
import { useTheme } from 'styled-components';
import { ButtonAdd } from '../CreateAlarm/styled';
import noteService from '../../services/noteService';
import { Alert } from 'react-native';

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
      <ContainerHeader>
        <BackButton onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={theme.colors.bgColor} />
        </BackButton>

        <Title>Nova nota</Title>

        <ButtonAdd onPress={handleSaveNote}>
          <Feather name="check" size={25} color={theme.colors.text} />
        </ButtonAdd>
      </ContainerHeader>

      <ContainerInputs>
        <ContainerInputsView>
          <InputTitleContainer>
            <InputTitle>Título</InputTitle>
            <Input
              placeholder="Digite um título"
              placeholderTextColor={theme.colors.textInactive}
              value={title}
              onChangeText={setTitle}
            />
          </InputTitleContainer>

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