import React, { useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { ContainerTitleDate, ContainerTodoView, TextDateTodo, TitleTodo } from './styled';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { MotiView } from 'moti';
import * as Haptics from 'expo-haptics';
import { Check } from 'lucide-react-native';

import ModalInfoContainer from '../../common/ModalInfoContainer/ModalBody';
import { PropsStack } from '../../../routes';
import { Todo } from '../../../entities/Todo';
import getDate from '../../../utils/getDate';
import { ModalCommon } from '../../common/ModalCommon';

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
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      await deleteTodo(todo);
    });
  };

  const navigateToUpdateTodo = () => {
    Haptics.selectionAsync();

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
          onLongPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          
            setModalVisible(true)
          }}
        >
          <ContainerTitleDate>
            <TitleTodo numberOfLines={1} ellipsizeMode='tail'>{todo.title}</TitleTodo>
            <TextDateTodo>{getDate(todo.createdAt.toString())}</TextDateTodo>
          </ContainerTitleDate>
          <Check size={RFValue(32)} color={theme.colors.bgColor} strokeWidth={RFValue(2)} />

          <ModalCommon.Root modalVisible={modalDeleteVisible} setModalVisible={setModalDeleteVisible}>
            <ModalCommon.Delete item={todo} deleteItem={handleDelete} setModalVisible={setModalDeleteVisible} />
          </ModalCommon.Root>
        </ContainerTodoView>

        {modalVisible &&
          <ModalInfoContainer setModalVisible={setModalVisible} setModalDeleteVisible={setModalDeleteVisible} />
        }
      </MotiView>
    </Animated.View>
  )
}

export default ContainerTodo