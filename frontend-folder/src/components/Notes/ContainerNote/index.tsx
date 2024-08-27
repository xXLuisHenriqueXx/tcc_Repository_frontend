import React, { useState } from 'react';
import { ContainerNoteView, ContainerTitleDate, DeleteButton, TextDateNote, TitleNote } from './styled';
import { AntDesign, Feather } from '@expo/vector-icons'
import { Note } from '../../../entities/Note';
import getDate from '../../../utils/getDate';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { PropsStack } from '../../../routes';
import ModalDelete from '../../common/ModalDelete';

interface ContainerNoteProps {
  note: Note;
  deleteNote: (note: Note) => Promise<void>;
}

const ContainerNote = ({ note, deleteNote }: ContainerNoteProps) => {
  const theme = useTheme();
  const navigation = useNavigation<PropsStack>();
  const [modalVisible, setModalVisible] = useState(false);

  const navigateToUpdateNote = () => {
    navigation.navigate("UpdateNote", { noteInfo: note });
  }

  return (
    <ContainerNoteView
      activeOpacity={0.85}
      onPress={navigateToUpdateNote}
      onLongPress={() => setModalVisible(true)}
    >
      <ContainerTitleDate>
        <TitleNote>{note.title}</TitleNote>
        <TextDateNote>{getDate(note.createdAt.toString())}</TextDateNote>
      </ContainerTitleDate>
      <AntDesign name='rightcircle' size={RFValue(30)} color={theme.colors.highlightColor} />

      <ModalDelete
        item={note}
        deleteItem={deleteNote}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </ContainerNoteView>
  )
}

export default ContainerNote