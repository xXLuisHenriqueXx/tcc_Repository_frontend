import React, { useEffect, useState } from 'react'
import Navbar from '../../components/common/Navbar'
import { Container, NormalText, Title } from './styled'
import { useTheme } from 'styled-components'
import { RFValue } from 'react-native-responsive-fontsize'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { PropsNavigationStack, PropsStack } from '../../routes'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Todo } from '../../entities/Todo'
import todoService from '../../services/todoService'
import { FlatList, ListRenderItem } from 'react-native'
import ContainerTodo from '../../components/Todo/ContainerTodo'
import Loader from '../Loader'
import BotaoAdd from '../../components/common/BotaoAdd'

type Props = NativeStackScreenProps<PropsNavigationStack, 'Todos'>;

const Todos = ({ route }: Props) => {
  const theme = useTheme();
  const navigation = useNavigation<PropsStack>();
  const isFocused = useIsFocused();

  const { newTodo } = route.params || {};
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleNavigateToCreateTodo = () => {
    navigation.navigate("CreateTodo")
  }

  const handleGetTodos = async () => {
    setIsLoading(true);

    const { data } = await todoService.getTodos();
    setTodos(data);

    setIsLoading(false);
  }

  useEffect(() => {
    if(isFocused || newTodo) {
      handleGetTodos();
    }
  }, [isFocused, newTodo]);

  const handleDeleteTodo = async (todoId: string) => {
    await todoService.deleteTodo({ _id: todoId});

    setTodos(prevTodos => prevTodos.filter(todo => todo._id !== todoId))
  }

  const renderItem: ListRenderItem<Todo> = ({ item }) => (
    <ContainerTodo 
      todo={item}
      deleteTodo={() => handleDeleteTodo(item._id)}
    />
  )

  if (isLoading) return <Loader type='load' />

  return (
    <Container source={theme.images.bgMain}>
      <FlatList
        style={{marginBottom: RFValue(70)}}
        data={todos}
        keyExtractor={item => item._id}
        ListHeaderComponent={
          <>
            <Title>Listas de tarefas</Title>
            <NormalText>Suas listas de tarefas se encontram aqui...</NormalText>
          </>
        }
        renderItem={renderItem}
      />
      
      <BotaoAdd navigate={handleNavigateToCreateTodo} />
      <Navbar screen='Todos' />
    </Container>
  )
}

export default Todos