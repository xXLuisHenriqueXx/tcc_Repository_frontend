import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { ContainerNoteView, ContainerTitleDate, TextContainer, TextDateNote, TitleNote } from './styled';
import { useNavigation } from '@react-navigation/native';

import ModalDelete from '../../common/ModalDelete';
import ModalInfoContainer from '../../common/ModalInfoContainer';
import { PropsStack } from '../../../routes';
import { Note } from '../../../entities/Note';
import getDate from '../../../utils/getDate';
import { MotiView } from 'moti';

interface ContainerNoteProps {
  note: Note;
  deleteNote: (note: Note) => Promise<void>;
}

const ContainerNote = ({ note, deleteNote }: ContainerNoteProps) => {
  const navigation = useNavigation<PropsStack>();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);

  const translateX = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  const handleDelete = async () => {
    Animated.timing(translateX, {
      toValue: 500,
      duration: 100,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(async () => {
      await deleteNote(note);
    });
  };

  const navigateToUpdateNote = () => {
    navigation.navigate("UpdateNote", { noteInfo: note });
  }

  return (
    <Animated.View style={{ transform: [{ translateX }] }}>
      <MotiView
        transition={{ type: 'timing', duration: 300 }}
        from={{ transform: modalVisible ? [{ scale: 1 }] : [{ scale: 1.05 }] }}
        animate={{ transform: modalVisible ? [{ scale: 1.05 }] : [{ scale: 1 }] }}
      >
        <ContainerNoteView
          onPress={navigateToUpdateNote}
          onLongPress={() => setModalVisible(true)}
        >
          <ContainerTitleDate>
            <TitleNote>{note.title}</TitleNote>
            <TextDateNote>{getDate(note.createdAt.toString())}</TextDateNote>
          </ContainerTitleDate>

          <TextContainer numberOfLines={5}>
            {note.content}
          </TextContainer>

          <ModalDelete
            item={note}
            deleteItem={handleDelete}
            modalVisible={modalDeleteVisible}
            setModalVisible={setModalDeleteVisible}
          />

        </ContainerNoteView>
        {modalVisible &&
          <ModalInfoContainer setModalVisible={setModalVisible} setModalDeleteVisible={setModalDeleteVisible} />
        }
      </MotiView>
    </Animated.View>
  )
}

export default ContainerNote