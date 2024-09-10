import React, { useEffect, useRef, useState } from 'react';
import { ContainerNoteView, ContainerTitleDate, DeleteButton, TextDateNote, TitleNote } from './styled';
import { AntDesign, Feather } from '@expo/vector-icons'
import { Note } from '../../../entities/Note';
import getDate from '../../../utils/getDate';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { PropsStack } from '../../../routes';
import ModalDelete from '../../common/ModalDelete';
import { Animated, Easing } from 'react-native';

interface ContainerNoteProps {
  note: Note;
  deleteNote: (note: Note) => Promise<void>;
}

const ContainerNote = ({ note, deleteNote }: ContainerNoteProps) => {
  const theme = useTheme();
  const navigation = useNavigation<PropsStack>();
  const [modalVisible, setModalVisible] = useState(false);

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

  useEffect(() => {
    if (modalVisible) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnimation, {
            toValue: 1.01,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnimation, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      scaleAnimation.setValue(1);
    }
  }, [modalVisible]);


  const navigateToUpdateNote = () => {
    navigation.navigate("UpdateNote", { noteInfo: note });
  }

  return (
    <Animated.View style={{ transform: [{ translateX}, {scale: scaleAnimation}] }}>
      <ContainerNoteView
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
          deleteItem={handleDelete}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </ContainerNoteView>
    </Animated.View>
  )
}

export default ContainerNote