import React from 'react';
import { ContainerNoteView, ContainerTitleDate, TextDateNote, TitleNote } from './styled';
import { AntDesign } from '@expo/vector-icons'
import { Note } from '../../../entities/Note';
import getDate from '../../../utils/getDate';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { PropsStack } from '../../../routes';

interface ContainerNoteProps {
  note: Note;
}

const ContainerNote = ({ note }: ContainerNoteProps) => {
  const theme = useTheme();
  const navigation = useNavigation<PropsStack>();

  const navigateToUpdateNote = () => {
    navigation.navigate("UpdateNote", { noteInfo: note });
  }

  return (
    <ContainerNoteView activeOpacity={0.9}>
      <ContainerTitleDate>
        <TitleNote>{note.title}</TitleNote>
        <TextDateNote>{getDate(note.createdAt.toString())}</TextDateNote>
      </ContainerTitleDate>
      <AntDesign name='rightcircle' size={RFValue(30)} color={theme.colors.highlightColor} />
    </ContainerNoteView>
  )
}

export default ContainerNote