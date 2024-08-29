import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons'
import getDate from '../../../utils/getDate';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { PropsStack } from '../../../routes';
import ModalDelete from '../../common/ModalDelete';
import { Todo } from '../../../entities/Todo';
import { ContainerTitleDate, ContainerTodoView, DeleteButton, TextDateTodo, TitleTodo } from './styled';

interface ContainerTodoProps {
  todo: Todo;
  deleteTodo: (todo: Todo) => Promise<void>;
}

const ContainerTodo = ({ todo, deleteTodo }: ContainerTodoProps) => {
  const theme = useTheme();
  const navigation = useNavigation<PropsStack>();
  const [modalVisible, setModalVisible] = useState(false);

  const navigateToUpdateTodo = () => {
    navigation.navigate("UpdateTodo", { todoInfo: todo });
  }

  return (
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
        deleteItem={deleteTodo}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </ContainerTodoView>
  )
}

export default ContainerTodo