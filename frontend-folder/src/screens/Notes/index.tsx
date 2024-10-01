import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, ListRenderItem, RefreshControl, View } from 'react-native';
import { HighlightText, NormalText, Title } from './styled';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

import Loader from '../Loader';
import BotaoAdd from '../../components/common/BotaoAdd';
import ContainerNote from '../../components/Notes/ContainerNote';
import noteService from '../../services/noteService';
import { Note } from '../../entities/Note';
import { PropsNavigationStack, PropsStack } from '../../routes';
import ContainerGradient from '../../components/common/ContainerGradient';
import ContainerRenderAnimated from '../../components/common/ContainerRenderAnimated';

type Props = NativeStackScreenProps<PropsNavigationStack, 'Notes'>;

const Notes = ({ route }: Props) => {
  const navigation = useNavigation<PropsStack>();
  const isFocused = useIsFocused();
  const { newNote } = route.params || {};

  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    if (isFocused || newNote) {
      handleGetNotes();
    }
  }, [isFocused, newNote]);

  const handleGetNotes = async () => {
    setIsLoading(true);

    try {
      const { data } = await noteService.getNotes();

      setNotes(data);

    } catch (err) {
      Alert.alert('Erro', 'Erro ao buscar notas');

    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    handleGetNotes().then(() => setIsRefreshing(false));
  }, []);

  const handleDeleteNote = async (noteId: string) => {
    await noteService.deleteNote({ _id: noteId });

    setNotes(prevNotes => prevNotes.filter(note => note._id !== noteId))
  }

  const handleNavigateToCreateNote = () => {
    navigation.navigate("CreateNote")
  }

  const renderItem: ListRenderItem<Note> = ({ item, index }) => (
    <ContainerRenderAnimated index={index}>
      <ContainerNote
        note={item}
        deleteNote={() => handleDeleteNote(item._id)}
      />
    </ContainerRenderAnimated>
  );

  if (isLoading) return <Loader type='load' />

  return (
    <ContainerGradient screen='Notes'>
      <FlatList
        style={{ marginBottom: RFValue(70) }}
        data={notes}
        keyExtractor={item => item._id}
        ListHeaderComponent={
          <View style={{ marginHorizontal: RFValue(16) }}>
            <Title>Notas</Title>
            <NormalText>Você possui <HighlightText>{notes.length}</HighlightText> {notes.length > 1 ? 'notas criadas' : 'nota criada'}...</NormalText>
          </View>
        }
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />

      <BotaoAdd navigate={handleNavigateToCreateNote} />
    </ContainerGradient>
  )
}

export default Notes;