import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, ListRenderItem, RefreshControl, View } from 'react-native';
import { HighlightText, NormalText, Title } from './styled';
import { RFValue } from 'react-native-responsive-fontsize';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Loader from '../Loader';
import ContainerTodo from '../../components/Todo/ContainerTodo';
import BotaoAdd from '../../components/common/BotaoAdd';
import { PropsNavigationStack, PropsStack } from '../../routes';
import { Todo } from '../../entities/Todo';
import todoService from '../../services/todoService';
import ContainerGradient from '../../components/common/ContainerGradient';
import ContainerRenderAnimated from '../../components/common/ContainerRenderAnimated';

type Props = NativeStackScreenProps<PropsNavigationStack, 'Todos'>;

const Todos = ({ route }: Props) => {
  const navigation = useNavigation<PropsStack>();
  const isFocused = useIsFocused();
  const { newTodo } = route.params || {};

  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    if (isFocused || newTodo) {
      handleGetTodos();
    }
  }, [isFocused, newTodo]);

  const handleGetTodos = async () => {
    setIsLoading(true);

    try {
      const { data } = await todoService.getTodos();
      setTodos(data);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar tarefas');
    } finally {
      setIsLoading(false);
    }
  }

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    handleGetTodos().then(() => setIsRefreshing(false));
  }, []);

  const handleDeleteTodo = async (todoId: string) => {
    await todoService.deleteTodo({ _id: todoId });

    setTodos(prevTodos => prevTodos.filter(todo => todo._id !== todoId))
  }


  const handleNavigateToCreateTodo = () => {
    navigation.navigate("CreateTodo")
  }


  const renderItem: ListRenderItem<Todo> = ({ item, index }) => (
    <ContainerRenderAnimated index={index}>
      <ContainerTodo
        todo={item}
        deleteTodo={() => handleDeleteTodo(item._id)}
      />
    </ContainerRenderAnimated>
  )

  if (isLoading) return <Loader type='load' />

  return (
    <ContainerGradient screen='Todos'>
      <FlatList
        style={{ marginBottom: RFValue(70) }}
        data={todos}
        keyExtractor={item => item._id}
        ListHeaderComponent={
          <View style={{ marginHorizontal: RFValue(16) }}>
            <Title>Listas de tarefas</Title>
            {todos.length > 0
              ? <NormalText>Você possui <HighlightText>{todos.length}</HighlightText> {todos.length > 1 ? 'listas de tarefas criadas' : 'lista de tarefa criada'}...</NormalText>
              : <NormalText>Você ainda não possui nenhuma lista de tarefa criada...</NormalText>
            }
          </View>
        }
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />

      <BotaoAdd navigate={handleNavigateToCreateTodo} />
    </ContainerGradient>
  )
}

export default Todos;