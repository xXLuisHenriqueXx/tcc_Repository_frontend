import React, { useState } from 'react'
import { AddTaskButton, AddTaskButtonText, Container, ContainerInputs, ContainerInputsTitle, ContainerInputsView, ContainerTitle, InputTitle } from './styled'
import DefaultHeader from '../../components/common/DefaultHeader/Index'
import { useTheme } from 'styled-components'
import { useNavigation } from '@react-navigation/native'
import { PropsStack } from '../../routes'
import todoService from '../../services/todoService'
import { Alert } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'
import taskService from '../../services/taskService'
import Loader from '../Loader'

interface TaskProps {
    title: string;
    done: boolean;
}

const CreateTodo = () => {
    const theme = useTheme();
    const navigation = useNavigation<PropsStack>();
    const [todoTitle, setTodoTitle] = useState("");
    const [tasks, setTasks] = useState<TaskProps[]>([]);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDone, setTaskDone] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSaveTodo = async () => {
        if (todoTitle === "") {
            alert("Digite um título para a lista de tarefas");
            return;

        } else {
            setIsLoading(true);

            const title = todoTitle.trim();
            const params = { title }

            const { status, data } = await todoService.addTodo(params);

            if (status === 201) {
                Alert.alert("Sucesso", "Lista de tarefas cadastrado com sucesso!");

                if (tasks.length === 0) {
                    navigation.navigate("Todos", { newTodo: true });
                } else {
                    tasks.map(async (task) => {
                        const taskParams = { todoId: data._id ,title: task.title, done: task.done }
                        await taskService.addTask(taskParams);
                    });

                    navigation.navigate("Todos", { newTodo: true });
                }
            }

            setIsLoading(false);
        }
    }

    const handleAddTask = () => {
        if (taskTitle === "") {
            alert("Digite um título para a tarefa");
            return;

        } else {
            const trimmedTitle = taskTitle.trim();

            setTasks([...tasks, { title: trimmedTitle, done: taskDone }]);
            setTaskTitle("");
        }
    }

    if (isLoading) return <Loader type='save' />

    return (
        <Container>
            <DefaultHeader title={todoTitle} setTitle={setTodoTitle} handleSave={handleSaveTodo} placeholderText='Título da lista de tarefas...' marginBottom={30} />

            <ContainerInputs>
                <ContainerInputsView>
                    <ContainerInputsTitle>
                        <ContainerTitle>Título da tarefa</ContainerTitle>
                        <InputTitle
                            placeholder="Digite o título da tarefa"
                            placeholderTextColor={theme.colors.textInactive}
                            value={taskTitle}
                            onChangeText={setTaskTitle}
                        />
                    </ContainerInputsTitle>

                    <AddTaskButton onPress={handleAddTask} >
                        <AddTaskButtonText>ADICIONAR ITEM</AddTaskButtonText>
                        <Entypo name="plus" size={30} color={theme.colors.bgColor} style={{ position: 'absolute', right: RFValue(30) }} />
                    </AddTaskButton>

                    {tasks.map((task, index) => (
                        <ContainerInputsTitle key={index}>
                            <ContainerTitle>{task.title}</ContainerTitle>
                        </ContainerInputsTitle>
                    ))}
                </ContainerInputsView>
            </ContainerInputs>
        </Container>
    )
}

export default CreateTodo