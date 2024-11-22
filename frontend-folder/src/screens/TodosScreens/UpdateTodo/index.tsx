import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { AddTaskButton, AddTaskButtonText, Container, ContainerInputLine, ContainerInputs, ContainerInputsView, InputTitle, TaskButton, TaskContainer, TaskDoneButton, TasksContainer, TaskTitle } from './styled';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Haptics from 'expo-haptics';
import { Plus, X } from 'lucide-react-native';

import Loader from '../../Loader';
import todoService from '../../../services/todoService';
import DefaultHeader from '../../../components/common/DefaultHeader';
import { Task } from '../../../entities/Todo';
import { PropsNavigationStack, PropsStack } from '../../../routes';

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
            const trimmedtitle = todoTitle.trim();

            if (!trimmedtitle) {
                Alert.alert("Aviso", "Digite um título para a lista de tarefas!");
                return;

            } else {
                const params = { _id: todoInfo?._id, title: trimmedtitle, tasks };

                const { status } = await todoService.updateTodo(params);

                if (status === 200) {
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

                    navigation.navigate("Todos", { newTodo: true });
                }
            }
        } catch (error: any) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

            if (error.response && error.response.data && error.response.data.errors) {
                const errorMessages = error.response.data.errors.map((err: any) => err.message).join('\n');
                Alert.alert("Erro", errorMessages);
            } else {
                Alert.alert("Erro", "Erro ao atualizar a lista de tarefas!");
            }
        } finally {
            setIsLoading(false);
        }
    }

    const handleAddTask = async () => {
        Haptics.selectionAsync();

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
        Haptics.selectionAsync();

        const updatedTasks = tasks.map((task, i) => {
            if (i === index) {
                task.done = !task.done;
            }

            return task;
        });

        setTasks(updatedTasks);
    }

    const handleDeleteTask = async (index: number) => {
        Haptics.selectionAsync();
        
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
                    <ContainerInputLine />

                    <InputTitle
                        placeholder="Digite o título da tarefa..."
                        placeholderTextColor={theme.colors.textInactive}
                        value={taskTitle}
                        onChangeText={setTaskTitle}
                    />

                    <AddTaskButton onPress={handleAddTask} disabled={isTaskLoading}>
                        <AddTaskButtonText>ADICIONAR ITEM</AddTaskButtonText>
                        <Plus style={{ position: 'absolute', right: RFValue(30) }} size={RFValue(24)} color={theme.colors.bgColor} strokeWidth={RFValue(2)} />
                    </AddTaskButton>

                    <TasksContainer>
                        {tasks.map((task, index) => (
                            <TaskContainer key={index}>
                                <TaskDoneButton
                                    style={task.done ? { backgroundColor: theme.colors.highlightColor } : { backgroundColor: 'transparent' }}
                                    onPress={() => handleUpdateTaskDone(index)}
                                />
                                <TaskTitle numberOfLines={1}>{task.title}</TaskTitle>

                                <TaskButton onPress={() => handleDeleteTask(index)}>
                                    <X size={RFValue(20)} color={theme.colors.highlightColor} strokeWidth={RFValue(2)} />
                                </TaskButton>
                            </TaskContainer>
                        ))}
                    </TasksContainer>
                </ContainerInputsView>
            </ContainerInputs>
        </Container>
    )
}

export default UpdateTodo;