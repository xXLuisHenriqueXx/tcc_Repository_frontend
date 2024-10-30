import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { AddTaskButton, AddTaskButtonText, Container, ContainerInputs, ContainerInputsTitle, ContainerInputsView, ContainerTitle, InputTitle, TaskButton, TaskContainer, TaskContainerButtons, TaskDoneButton, TasksContainer, TasksContainerTitle, TaskTitle } from './styled';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import todoService from '../../services/todoService';
import { RFValue } from 'react-native-responsive-fontsize';
import { Pencil, Plus, Trash } from 'lucide-react-native';

import Loader from '../Loader';
import DefaultHeader from '../../components/common/DefaultHeader';
import { Task } from '../../entities/Todo';
import { PropsNavigationStack, PropsStack } from '../../routes';
import taskService from '../../services/taskService';

type Props = NativeStackScreenProps<PropsNavigationStack, 'UpdateTodo'>

const UpdateTodo = ({ route }: Props) => {
    const theme = useTheme();
    const navigation = useNavigation<PropsStack>();
    const { todoInfo } = route.params || {};

    const [todoTitle, setTodoTitle] = useState<string>("");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskTitle, setTaskTitle] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isTaskLoading, setIsTaskLoading] = useState<boolean>(false);


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
                const params = { _id: todoInfo?._id, title: title, tasks };

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
        if (taskTitle === "") {
            Alert.alert("Aviso", "Digite um título para a tarefa!");
            return;
        } else {
            const trimmedTitle = taskTitle.trim();

            setTasks([...tasks, { title: trimmedTitle, done: false }]);
            setTaskTitle("");
        }
    }

    const handleUpdateTaskDone = async (index: number) => {
        const updatedTasks = tasks.map((task, i) => {
            if (i === index) {
                task.done = !task.done;
            }

            return task;
        });

        setTasks(updatedTasks);
    }

    const handleDeleteTask = async (index: number) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
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
                        <Plus style={{ position: 'absolute', right: RFValue(30) }} size={RFValue(24)} color={theme.colors.bgColor} strokeWidth={RFValue(2)} />
                    </AddTaskButton>

                    <TasksContainer>
                        <TasksContainerTitle>Tarefas</TasksContainerTitle>
                        {tasks.map((task, index) => (
                            <TaskContainer key={index}>
                                <TaskDoneButton
                                    style={task.done ? { backgroundColor: theme.colors.highlightColor } : { backgroundColor: 'transparent' }}
                                    onPress={() => handleUpdateTaskDone(index)}
                                />
                                <TaskTitle numberOfLines={1}>{task.title}</TaskTitle>
                                <TaskContainerButtons>
                                    <TaskButton>
                                        <Pencil size={RFValue(20)} color={theme.colors.highlightColor} strokeWidth={RFValue(2)} />
                                    </TaskButton>
                                    <TaskButton onPress={() => handleDeleteTask(index)}>
                                        <Trash size={RFValue(20)} color={theme.colors.highlightColor} strokeWidth={RFValue(2)} />
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