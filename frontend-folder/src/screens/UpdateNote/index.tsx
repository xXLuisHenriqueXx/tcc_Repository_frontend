import React, { useEffect, useState } from 'react'
import { BackButton, Container, ContainerHeader, ContainerInputs, ContainerInputsView, Input, InputTitleContainer, InputTitle, Title, InputContent } from './styled';
import { useNavigation } from '@react-navigation/native';
import { PropsNavigationStack, PropsStack } from '../../routes';
import { Feather } from "@expo/vector-icons"
import { useTheme } from 'styled-components';
import { ButtonAdd } from '../CreateAlarm/styled';
import noteService from '../../services/noteService';
import { Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<PropsNavigationStack, 'UpdateNote'>

const UpdateNote = ({ route }: Props) => {
    const theme = useTheme();
    const navigation = useNavigation<PropsStack>();
    const [fields, setFields] = useState({
        title: "",
        content: ""
    })

    const { noteInfo } = route.params || {};

    const handleUpdateNote = async () => {
        const params = { _id: noteInfo?._id, title: fields.title, content: fields.content };

        const response = await noteService.updateNote(params);

        if (response.status === 200) {
            Alert.alert("Sucesso", "Nota atualizada com sucesso!");

            navigation.navigate("Notes", { newNote: true });
        }
    }

    const handleSetInfos = async () => {
        setFields({
            ...fields,
            title: noteInfo?.title || "",
            content: noteInfo?.content || ""
        })
    }

    useEffect(() => {
        handleSetInfos();
    }, []);

    return (
        <Container>
            <ContainerHeader>
                <BackButton onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={24} color={theme.colors.bgColor} />
                </BackButton>

                <Title>Atualizar nota</Title>

                <ButtonAdd onPress={handleUpdateNote}>
                    <Feather name="check" size={25} color={theme.colors.text} />
                </ButtonAdd>
            </ContainerHeader>

            <ContainerInputs>
                <ContainerInputsView>
                    <InputTitleContainer>
                        <InputTitle>Título</InputTitle>
                        <Input
                            placeholder="Digite um título"
                            placeholderTextColor={theme.colors.textInactive}
                            value={fields.title}
                            onChangeText={(text) => {
                                setFields({ ...fields, title: text })
                            }}
                        />
                    </InputTitleContainer>

                    <InputContent
                        style={{ textAlignVertical: "top" }}
                        placeholder="Digite o conteúdo"
                        placeholderTextColor={theme.colors.textInactive}
                        value={fields.content}
                        onChangeText={(text) => {
                            setFields({ ...fields, content: text })
                        }}
                        multiline
                    />
                </ContainerInputsView>
            </ContainerInputs>
        </Container>
    )
}

export default UpdateNote;