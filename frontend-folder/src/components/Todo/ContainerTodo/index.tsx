import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { ContainerTitleDate, ContainerTodoView, TextDateTodo, TitleTodo } from './styled';
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import ModalDelete from '../../common/ModalDelete';
import ModalInfoContainer from '../../common/ModalInfoContainer';
import { PropsStack } from '../../../routes';
import { Todo } from '../../../entities/Todo';
import getDate from '../../../utils/getDate';

interface ContainerTodoProps {
  todo: Todo;
  deleteTodo: (todo: Todo) => Promise<void>;
}

const ContainerTodo = ({ todo, deleteTodo }: ContainerTodoProps) => {
  const theme = useTheme();
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
      await deleteTodo(todo);
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

  const navigateToUpdateTodo = () => {
    navigation.navigate("UpdateTodo", { todoInfo: todo });
  }

  return (
    <Animated.View style={{ transform: [{translateX}, {scale: scaleAnimation}] }}>
      <ContainerTodoView
        onPress={navigateToUpdateTodo}
        onLongPress={() => setModalVisible(true)}
      >
        <ContainerTitleDate>
          <TitleTodo>{todo.title}</TitleTodo>
          <TextDateTodo>{getDate(todo.createdAt.toString())}</TextDateTodo>
        </ContainerTitleDate>
        <Feather name='check' size={RFValue(30)} color={theme.colors.textInactive} />

        <ModalDelete
          item={todo}
          deleteItem={handleDelete}
          modalVisible={modalDeleteVisible}
          setModalVisible={setModalDeleteVisible}
        />
      </ContainerTodoView>
      {modalVisible &&
        <ModalInfoContainer setModalVisible={setModalVisible} setModalDeleteVisible={setModalDeleteVisible} />
      }
    </Animated.View>
  )
}

export default ContainerTodo