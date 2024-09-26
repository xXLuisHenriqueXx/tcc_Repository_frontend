import React, { useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { ContainerTitleDate, ContainerTodoView, TextDateTodo, TitleTodo } from './styled';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { MotiView } from 'moti';
import { Check } from 'lucide-react-native';

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
      await deleteTodo(todo);
    });
  };

  const navigateToUpdateTodo = () => {
    navigation.navigate("UpdateTodo", { todoInfo: todo });
  }

  return (
    <Animated.View style={{ transform: [{ translateX }] }}>
      <MotiView
        transition={{ type: 'timing', duration: 300 }}
        from={{ transform: modalVisible ? [{ scale: 1 }] : [{ scale: 1.05 }] }}
        animate={{ transform: modalVisible ? [{ scale: 1.05 }] : [{ scale: 1 }] }}
      >
        <ContainerTodoView
          onPress={navigateToUpdateTodo}
          onLongPress={() => setModalVisible(true)}
        >
          <ContainerTitleDate>
            <TitleTodo>{todo.title}</TitleTodo>
            <TextDateTodo>{getDate(todo.createdAt.toString())}</TextDateTodo>
          </ContainerTitleDate>
          <Check size={RFValue(30)} color={theme.colors.textInactive} strokeWidth={RFValue(2)} />

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
      </MotiView>
    </Animated.View>
  )
}

export default ContainerTodo