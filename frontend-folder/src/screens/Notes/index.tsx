import React, { useEffect, useState } from 'react'
import { Container, NormalText, Title } from './styled'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PropsNavigationStack, PropsStack } from '../../routes';
import Navbar from '../../components/common/Navbar';
import { useTheme } from 'styled-components';
import BotaoAdd from '../../components/common/BotaoAdd';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Note } from '../../entities/Note';
import { FlatList, ListRenderItem } from 'react-native';
import ContainerNote from '../../components/Notes/ContainerNote';
import noteService from '../../services/noteService';
import Loader from '../Loader';

type Props = NativeStackScreenProps<PropsNavigationStack, 'Notes'>;

const Notes = ({ route }: Props) => {
  const theme = useTheme();
  const navigation = useNavigation<PropsStack>();
  const isFocused = useIsFocused();

  const { newNote } = route.params || {};
  const [notes, setNotes] = useState<Note[]>([]);

  const handleNavigateToCreateNote = () => {
    navigation.navigate("CreateNote")
  }

  const handleGetNotes = async () => {
    const { data } = await noteService.getNotes();

    setNotes(data);
  }

  useEffect(() => {
    if (isFocused || newNote) {
      handleGetNotes();
    }
  }, [isFocused, newNote]);

  const renderItem: ListRenderItem<Note> = ({ item }) => (
    <ContainerNote 
      note={item}
    />
  );

  if (!notes) return <Loader />

  return (
    <Container source={theme.images.bgMain}>
      <FlatList
        data={notes}
        keyExtractor={item => item._id}
        ListHeaderComponent={
          <>
            <Title>Notas</Title>
            <NormalText>Suas notas encontram aqui...</NormalText>
          </>
        }
        renderItem={renderItem}
      />

      <BotaoAdd navigate={handleNavigateToCreateNote} />
      <Navbar screen="Notes" />
    </Container>
  )
}

export default Notes