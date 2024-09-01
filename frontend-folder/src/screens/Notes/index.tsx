import React, { useCallback, useEffect, useState } from 'react'
import { NormalText, Title } from './styled'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PropsNavigationStack, PropsStack } from '../../routes';
import Navbar from '../../components/common/Navbar';
import { useTheme } from 'styled-components';
import BotaoAdd from '../../components/common/BotaoAdd';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Note } from '../../entities/Note';
import { Alert, FlatList, ListRenderItem, RefreshControl } from 'react-native';
import ContainerNote from '../../components/Notes/ContainerNote';
import noteService from '../../services/noteService';
import Loader from '../Loader';
import { RFValue } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';

type Props = NativeStackScreenProps<PropsNavigationStack, 'Notes'>;

const Notes = ({ route }: Props) => {
  const theme = useTheme();
  const navigation = useNavigation<PropsStack>();
  const isFocused = useIsFocused();

  const { newNote } = route.params || {};
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

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

  }

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
    <MotiView
      from={{ translateX: -300, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      transition={{
        type: 'timing',
        duration: 200,
        delay: index * 100
      }}
    >
      <ContainerNote
        note={item}
        deleteNote={() => handleDeleteNote(item._id)}
      />
    </MotiView>
  );

  if (isLoading) return <Loader type='load' />

  return (
    <LinearGradient
      colors={theme.colors.bgMainColor}
      style={{ flex: 1 }}
    >
      <FlatList
        style={{ marginBottom: RFValue(70), marginHorizontal: RFValue(16) }}
        data={notes}
        keyExtractor={item => item._id}
        ListHeaderComponent={
          <>
            <Title>Notas</Title>
            <NormalText>Suas notas encontram aqui...</NormalText>
          </>
        }
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />

      <BotaoAdd navigate={handleNavigateToCreateNote} />
      <Navbar screen="Notes" />
    </LinearGradient>
  )
}

export default Notes