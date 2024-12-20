import React, { useRef, useState } from 'react';
import { ContainerNoteView, ContainerTitleDate, TextContainer, TextDateNote, TitleNote } from './styled';
import { Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import { PropsStack } from '../../../routes';
import { Note } from '../../../entities/Note';
import getDate from '../../../utils/getDate';
import { MotiView } from 'moti';
import { ModalCommon } from '../../common/ModalCommon';

interface ContainerNoteProps {
  note: Note;
  deleteNote: (note: Note) => Promise<void>;
}

const ContainerNote = ({ note, deleteNote }: ContainerNoteProps) => {
  const navigation = useNavigation<PropsStack>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState<boolean>(false);

  const translateX = useRef(new Animated.Value(0)).current;

  const handleDelete = async () => {
    Animated.timing(translateX, {
      toValue: 500,
      duration: 100,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(async () => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      await deleteNote(note);
    });
  };

  const navigateToUpdateNote = () => {
    Haptics.selectionAsync();

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
          onLongPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

            setModalVisible(true)
          }}
        >
          <ContainerTitleDate>
            <TitleNote numberOfLines={1} ellipsizeMode='tail'>{note.title}</TitleNote>
            <TextDateNote>{getDate(note.createdAt.toString())}</TextDateNote>
          </ContainerTitleDate>

          <TextContainer numberOfLines={5}>
            {note.content}
          </TextContainer>

          <ModalCommon.Root modalVisible={modalDeleteVisible} setModalVisible={setModalDeleteVisible}>
            <ModalCommon.Delete item={note} deleteItem={handleDelete} setModalVisible={setModalDeleteVisible} />
          </ModalCommon.Root>
        </ContainerNoteView>

        {modalVisible &&
          <ModalCommon.InfoContainer setModalVisible={setModalVisible} setModalDeleteVisible={setModalDeleteVisible} />
        }
      </MotiView>
    </Animated.View>
  )
}

export default ContainerNote