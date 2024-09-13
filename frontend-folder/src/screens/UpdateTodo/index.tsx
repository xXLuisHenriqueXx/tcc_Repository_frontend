import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { AddTaskButton, AddTaskButtonText, Container, ContainerInputs, ContainerInputsTitle, ContainerInputsView, ContainerTitle, InputTitle, TaskButton, TaskContainer, TaskContainerButtons, TaskDoneButton, TasksContainer, TasksContainerTitle, TaskTitle } from './styled';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import todoService from '../../services/todoService';
import { RFValue } from 'react-native-responsive-fontsize';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';

import Loader from '../Loader';
import DefaultHeader from '../../components/common/DefaultHeader';
import { Task } from '../../entities/Todo';
import { PropsNavigationStack, PropsStack } from '../../routes';
import taskService from '../../services/taskService';

type Props = NativeStackScreenProps<PropsNavigationStack, 'UpdateTodo'>

const UpdateTodo = ({ route }: Props) => {
    const theme = useTheme();
    const navigation = useNavigation<PropsStack>();
    const [todoTitle, setTodoTitle] = useState("");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskTitle, setTaskTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isTaskLoading, setIsTaskLoading] = useState(false);

    const { todoInfo } = route.params || {};

    useEffect(() => {
        handleSetInfos();
    }, []);

    const handleSetInfos = async () => {
        setTodoTitle(todoInfo?.title || "");
        setTasks(todoInfo?.tasks || []);
    }

    const handleUpdateTodo = async () => {
        setIsLoading(true);

        try {
            if (todoTitle === "") {
                Alert.alert("Aviso", "Digite um título para a lista de tarefas!");
                return;

            } else {
                const title = todoTitle.trim();
                const params = { _id: todoInfo?._id, title: title };

                const { status } = await todoService.updateTodo(params);

                if (status === 200) {
                    navigation.navigate("Todos", { newTodo: true });
                }
            }
        } catch (error) {
            Alert.alert("Erro", "Erro ao atualizar lista de tarefas!");
        } finally {
            setIsLoading(false);
        }
    }

    const handleAddTask = async () => {
        setIsTaskLoading(true);

        try {
            const title = taskTitle.trim();

            if (title === "") {
                Alert.alert("Aviso", "Digite um título para a tarefa!");
                return;
            }

            const newTask = await taskService.addTask({ todoId: todoInfo?._id, title: title, done: false });
            setTasks([...tasks, newTask.data]);
            setTaskTitle("");
        } catch (error) {
            Alert.alert("Erro", "Erro ao adicionar tarefa!");
        } finally {
            setIsTaskLoading(false);
        }
    }

    const handleUpdateTaskDone = async (taskId: string) => {
        setIsLoading(true);

        try {
            const task = tasks.find(task => task._id === taskId);

            if (task) {
                const updatedTask = { ...task, done: !task.done };
                const response = await taskService.updateTaskDone({ _id: taskId, todoId: todoInfo?._id, done: updatedTask.done });

                if (response.status === 200) {
                    const updatedTasks = tasks.map(task => task._id === taskId ? updatedTask : task);
                    setTasks(updatedTasks);
                }
            }
        } catch (error) {
            Alert.alert("Erro", "Erro ao atualizar tarefa!");
        } finally {
            setIsLoading(false);
        }
    }

    const handleDeleteTask = async (taskId: string) => {
        setIsTaskLoading(true);

        try {
            const response = await taskService.deleteTask({ _id: taskId, todoId: todoInfo?._id });

            if (response.status === 204) {
                const updatedTasks = tasks.filter(task => task._id !== taskId);
                setTasks(updatedTasks);
            }
        } catch (error) {
            Alert.alert("Erro", "Erro ao deletar tarefa!");
        } finally {
            setIsTaskLoading(false);
        }
    }

    if (isLoading) return <Loader type='save' />

    return (
        <Container>
            <DefaultHeader title={todoTitle} setTitle={setTodoTitle} handleSave={handleUpdateTodo} placeholderText='Título da lista de tarefas...' marginBottom={30} />

            <ContainerInputs
                from={{ translateY: 300, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{ type: 'timing', duration: 200 }}
            >
                <ContainerInputsView>
                    <ContainerInputsTitle>
                        <ContainerTitle>Título da tarefa</ContainerTitle>
                        <InputTitle
                            placeholder="Digite o título da tarefa..."
                            placeholderTextColor={theme.colors.textInactive}
                            value={taskTitle}
                            onChangeText={setTaskTitle}
                        />
                    </ContainerInputsTitle>

                    <AddTaskButton onPress={handleAddTask} disabled={isTaskLoading}>
                        <AddTaskButtonText>ADICIONAR ITEM</AddTaskButtonText>
                        <Entypo name="plus" size={RFValue(24)} color={theme.colors.bgColor} style={{ position: 'absolute', right: RFValue(30) }} />
                    </AddTaskButton>

                    <TasksContainer>
                        <TasksContainerTitle>Tarefas</TasksContainerTitle>
                        {tasks.map((task, index) => (
                            <TaskContainer key={index}>
                                <TaskDoneButton
                                    style={task.done ? { backgroundColor: theme.colors.highlightColor } : { backgroundColor: 'transparent' }}
                                    onPress={() => handleUpdateTaskDone(task._id)}
                                />
                                <TaskTitle numberOfLines={1}>{task.title}</TaskTitle>
                                <TaskContainerButtons>
                                    <TaskButton>
                                        <Entypo name="edit" size={RFValue(20)} color={theme.colors.highlightColor} />
                                    </TaskButton>
                                    <TaskButton onPress={() => handleDeleteTask(task._id)}>
                                        <FontAwesome5 name="trash" size={RFValue(20)} color={theme.colors.highlightColor} />
                                    </TaskButton>
                                </TaskContainerButtons>
                            </TaskContainer>
                        ))}
                    </TasksContainer>
                </ContainerInputsView>
            </ContainerInputs>
        </Container>
    )
}

export default UpdateTodo;