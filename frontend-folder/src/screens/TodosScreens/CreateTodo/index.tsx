import React, { useState } from 'react';
import { Alert } from 'react-native';
import { AddTaskButton, AddTaskButtonText, Container, ContainerInputLine, ContainerInputs, ContainerInputsView, InputTitle, TaskButton, TaskContainer, TaskDoneButton, TasksContainer, TaskTitle } from './styled';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Plus, X } from 'lucide-react-native';

import Loader from '../../Loader';
import DefaultHeader from '../../../components/common/DefaultHeader';
import { PropsStack } from '../../../routes';
import todoService from '../../../services/todoService';
import { Task } from '../../../entities/Todo';

const CreateTodo = () => {
    const theme = useTheme();
    const navigation = useNavigation<PropsStack>();

    const [todoTitle, setTodoTitle] = useState<string>("");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskTitle, setTaskTitle] = useState<string>("");
    const [taskDone, setTaskDone] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSaveTodo = async () => {
        setIsLoading(true);

        try {
            if (todoTitle === "") {
                Alert.alert("Aviso", "Digite um título para a lista de tarefas!");
                return;

            } else {
                const title = todoTitle.trim();
                const params = { title, tasks }

                const { status } = await todoService.addTodo(params);

                if (status === 201) {
                    navigation.navigate("Todos", { newTodo: true });
                }
            }
        } catch (err) {
            Alert.alert('Erro', 'Erro ao salvar lista de tarefas');
        } finally {
            setIsLoading(false);
        }
    }

    const handleAddTask = () => {
        if (taskTitle === "") {
            Alert.alert("Aviso", "Digite um título para a tarefa!");
            return;

        } else {
            const trimmedTitle = taskTitle.trim();

            setTasks([...tasks, { title: trimmedTitle, done: taskDone }]);
            setTaskTitle("");
        }
    }

    const handleUpdateTaskDone = (index: number) => {
        const updatedTasks = tasks.map((task, i) => {
            if (i === index) {
                task.done = !task.done;
            }

            return task;
        });

        setTasks(updatedTasks);
    }

    const handleDeleteTask = (index: number) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    if (isLoading) return <Loader type='save' />

    return (
        <Container>
            <DefaultHeader title={todoTitle} setTitle={setTodoTitle} handleSave={handleSaveTodo} placeholderText='Título da lista de tarefas...' marginBottom={30} />

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

                    <AddTaskButton onPress={handleAddTask}>
                        <AddTaskButtonText>ADICIONAR TAREFA</AddTaskButtonText>
                        <Plus style={{ position: 'absolute', right: RFValue(30) }} size={RFValue(20)} color={theme.colors.bgColor} strokeWidth={RFValue(2)} />
                    </AddTaskButton>

                    <TasksContainer>
                        {tasks.map((task, index) => (
                            <TaskContainer key={index}>
                                <TaskDoneButton
                                    style={task.done ? { backgroundColor: theme.colors.highlightColor } : { backgroundColor: 'transparent' }}
                                    onPress={() => handleUpdateTaskDone(index)}
                                />
                                <TaskTitle numberOfLines={1} ellipsizeMode='tail'>{task.title}</TaskTitle>

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

export default CreateTodo;