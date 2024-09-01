import React, { useCallback, useEffect, useState } from 'react'
import Navbar from '../../components/common/Navbar'
import { NormalText, Title } from './styled'
import { useTheme } from 'styled-components'
import { RFValue } from 'react-native-responsive-fontsize'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { PropsNavigationStack, PropsStack } from '../../routes'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Todo } from '../../entities/Todo'
import todoService from '../../services/todoService'
import { Alert, FlatList, ListRenderItem, RefreshControl } from 'react-native'
import ContainerTodo from '../../components/Todo/ContainerTodo'
import Loader from '../Loader'
import BotaoAdd from '../../components/common/BotaoAdd'
import { LinearGradient } from 'expo-linear-gradient'
import { MotiView } from 'moti'

type Props = NativeStackScreenProps<PropsNavigationStack, 'Todos'>;

const Todos = ({ route }: Props) => {
  const theme = useTheme();
  const navigation = useNavigation<PropsStack>();
  const isFocused = useIsFocused();

  const { newTodo } = route.params || {};
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

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
    <MotiView
      from={{ translateX: -300, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      transition={{
        type: 'timing',
        duration: 200,
        delay: index * 100
      }}
    >
      <ContainerTodo
        todo={item}
        deleteTodo={() => handleDeleteTodo(item._id)}
      />
    </MotiView>
  )

  if (isLoading) return <Loader type='load' />

  return (
    <LinearGradient
      colors={theme.colors.bgMainColor}
      style={{ flex: 1 }}
    >
      <FlatList
        style={{ marginBottom: RFValue(70), marginHorizontal: RFValue(16) }}
        data={todos}
        keyExtractor={item => item._id}
        ListHeaderComponent={
          <>
            <Title>Listas de tarefas</Title>
            <NormalText>Suas listas de tarefas se encontram aqui...</NormalText>
          </>
        }
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />

      <BotaoAdd navigate={handleNavigateToCreateTodo} />
      <Navbar screen='Todos' />
    </LinearGradient>
  )
}

export default Todos