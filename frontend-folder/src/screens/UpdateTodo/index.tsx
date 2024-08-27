import React, { useEffect, useState } from 'react'
import { AddTaskButton, AddTaskButtonText, Container, ContainerInputs, ContainerInputsTitle, ContainerInputsView, ContainerTitle, InputTitle, TaskButton, TaskContainer, TaskContainerButtons, TaskDoneButton, TasksContainer, TasksContainerTitle, TaskTitle } from './styled'
import DefaultHeader from '../../components/common/DefaultHeader/Index'
import { useTheme } from 'styled-components'
import { useNavigation } from '@react-navigation/native'
import { PropsNavigationStack, PropsStack } from '../../routes'
import todoService from '../../services/todoService'
import { Alert } from 'react-native'
import { Entypo, FontAwesome5 } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'
import taskService from '../../services/taskService'
import Loader from '../Loader'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Task } from '../../entities/Todo'

type Props = NativeStackScreenProps<PropsNavigationStack, 'UpdateTodo'>

const UpdateTodo = ({ route }: Props) => {
    const theme = useTheme();
    const navigation = useNavigation<PropsStack>();
    const [todoTitle, setTodoTitle] = useState("");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskTitle, setTaskTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { todoInfo } = route.params || {};

    const handleUpdateTodo = async () => {
        if (todoTitle === "") {
            Alert.alert("Aviso", "Digite um título para a lista de tarefas!");
            return;

        } else {
            setIsLoading(true);

            const title = todoTitle.trim();
            const params = { _id: todoInfo?._id, title: title };

            const { status } = await todoService.updateTodo(params);

            if (status === 200) {
                navigation.navigate("Todos", { newTodo: true });
            } 
            
            setIsLoading(false);
        }
    }

    const handleAddTask = async () => {
        const title = taskTitle.trim();

        if (title === "") {
            Alert.alert("Aviso", "Digite um título para a tarefa!");
            return;
        }

        const newTask = await taskService.addTask({ todoId: todoInfo?._id, title: title, done: false });
        setTasks([...tasks, newTask.data]);
        setTaskTitle("");
    }

    const handleUpdateTaskDone = async (taskId: string) => {
        const task = tasks.find(task => task._id === taskId);

        if (task) {
            const updatedTask = { ...task, done: !task.done };
            const response = await taskService.updateTaskDone({ _id: taskId, todoId: todoInfo?._id, done: updatedTask.done });

            if (response.status === 200) {
                const updatedTasks = tasks.map(task => task._id === taskId ? updatedTask : task);
                setTasks(updatedTasks);
            }
        }
    }

    const handleDeleteTask = async (taskId: string) => {
        const response = await taskService.deleteTask({ _id: taskId, todoId: todoInfo?._id });

        if (response.status === 204) {
            const updatedTasks = tasks.filter(task => task._id !== taskId);
            setTasks(updatedTasks);
        }
    }

    const handleSetInfos = async () => {
        setTodoTitle(todoInfo?.title || "")
        setTasks(todoInfo?.tasks || [])
    }

    useEffect(() => {
        handleSetInfos();
    }, []);

    if (isLoading) return <Loader type='save' />

    return (
        <Container>
            <DefaultHeader title={todoTitle} setTitle={setTodoTitle} handleSave={handleUpdateTodo} placeholderText='Título da lista de tarefas...' marginBottom={30} />

            <ContainerInputs>
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

                    <AddTaskButton activeOpacity={0.85} onPress={handleAddTask} >
                        <AddTaskButtonText>ADICIONAR ITEM</AddTaskButtonText>
                        <Entypo name="plus" size={RFValue(24)} color={theme.colors.bgColor} style={{ position: 'absolute', right: RFValue(30) }} />
                    </AddTaskButton>

                    <TasksContainer>
                        <TasksContainerTitle>Tarefas</TasksContainerTitle>
                        {tasks.map((task, index) => (
                            <TaskContainer key={index}>
                                <TaskDoneButton
                                    style={task.done ? { backgroundColor: theme.colors.highlightColor } : { backgroundColor: 'transparent' }}
                                    activeOpacity={0.85}
                                    onPress={() => handleUpdateTaskDone(task._id)}
                                />
                                <TaskTitle numberOfLines={1}>{task.title}</TaskTitle>
                                <TaskContainerButtons>
                                    <TaskButton activeOpacity={0.85}>
                                        <Entypo name="edit" size={RFValue(20)} color={theme.colors.highlightColor} />
                                    </TaskButton>
                                    <TaskButton activeOpacity={0.85} onPress={() => handleDeleteTask(task._id)}>
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