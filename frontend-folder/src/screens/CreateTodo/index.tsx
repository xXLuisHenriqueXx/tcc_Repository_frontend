import React, { useState } from 'react'
import { Container, ContainerInputs, ContainerInputsView } from './styled'
import DefaultHeader from '../../components/common/DefaultHeader/Index'
import { useTheme } from 'styled-components'
import { useNavigation } from '@react-navigation/native'
import { PropsStack } from '../../routes'
import todoService from '../../services/todoService'
import { Alert } from 'react-native'

const CreateTodo = () => {
    const theme = useTheme();
    const navigation = useNavigation<PropsStack>();
    const [title, setTitle] = useState("");

    const handleSaveTodo = async () => {
        if (title === "") {
            alert("Digite um título para a lista de tarefas");
            return;

        } else {
            const params = { title }

            const { status } = await todoService.addTodo(params);

            if (status === 201) {
                Alert.alert("Sucesso", "Lista de tarefas cadastrado com sucesso!");

                navigation.navigate("Todos", { newTodo: true });
            }
        }
    }

    return (
        <Container>
            <DefaultHeader title={title} setTitle={setTitle} handleSave={handleSaveTodo} placeholderText='Título da lista de tarefas...' marginBottom={30} />

            <ContainerInputs>
                <ContainerInputsView>
                    
                </ContainerInputsView>
            </ContainerInputs>
        </Container>
    )
}

export default CreateTodo