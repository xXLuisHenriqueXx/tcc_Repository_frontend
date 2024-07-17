import React, { useEffect, useState } from 'react'
import { User } from '../../entities/User'
import { BackButton, Container, ContainerForm, ContainerText, ContainerView, Input, InputContainer, NormalText, Title, UpdateButton, UpdateButtonText } from './styled';
import { Feather, Entypo } from "@expo/vector-icons"
import { useTheme } from 'styled-components';
import userService from '../../services/userService';
import { Alert } from 'react-native';
import useAuth from '../../hook/useAuth';
import { useNavigation } from '@react-navigation/native';
import { PropsNavigationStack, PropsStack } from '../../routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<PropsNavigationStack, 'UpdateProfile'>;

const UpdateProfile = ({ route }: Props) => {
    const navigation = useNavigation<PropsStack>();
    const theme = useTheme();

    const [fields, setFields] = useState({
        name: "",
        email: "",
        password: "",
        newPassword: "",
        confirmNewPassword: ""
    })

    const { logout } = useAuth();
    const { userInfo } = route.params || {};

    const handleUpdate = async () => {
        const response = await userService.updateUserProfile(fields);

        if (response.status === 400) {
            Alert.alert("Erro", "Email já cadastrado!");
            return;
        }

        if (fields.email != userInfo?.email) {
            logout();
        }

        navigation.navigate("Alarms", { newAlarm: false });
        Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
    }

    const handleSetInfos = async () => {
        setFields({
            ...fields,
            name: userInfo?.name || "",
            email: userInfo?.email || "",
        })
    }

    useEffect(() => {
        handleSetInfos();
    }, []);

    return (
        <Container>
            <BackButton activeOpacity={0.8} onPress={() => navigation.goBack()}>
                <Feather name="arrow-left" size={24} color={theme.colors.bgColor} />
            </BackButton>

            <ContainerView>
                <ContainerText>
                    <Title>Edição de perfil</Title>
                    <NormalText>Nesta tela você pode editar seus credenciais.</NormalText>
                </ContainerText>

                <ContainerForm>
                    <InputContainer>
                        <Entypo name="user" size={25} color={theme.colors.highlightColor} />
                        <Input
                            value={fields.name}
                            onChangeText={(text) => {
                                setFields({ ...fields, name: text })
                            }}
                        />
                    </InputContainer>

                    <InputContainer>
                        <Entypo name="mail" size={25} color={theme.colors.highlightColor} />
                        <Input
                            value={fields.email}
                            onChangeText={(text) => {
                                setFields({ ...fields, email: text })
                            }}
                        />
                    </InputContainer>

                    <InputContainer>
                        <Entypo name="lock" size={25} color={theme.colors.highlightColor} />
                        <Input
                            placeholder='Digite sua senha atual...'
                            placeholderTextColor={theme.colors.textInactive}
                            secureTextEntry
                        />
                    </InputContainer>

                    <InputContainer>
                        <Entypo name="lock" size={25} color={theme.colors.highlightColor} />
                        <Input
                            placeholder='Digite sua nova senha...'
                            placeholderTextColor={theme.colors.textInactive}
                            secureTextEntry
                        />
                    </InputContainer>

                    <InputContainer>
                        <Entypo name="lock" size={25} color={theme.colors.highlightColor} />
                        <Input
                            placeholder='Digite sua nova senha novamente...'
                            placeholderTextColor={theme.colors.textInactive}
                            secureTextEntry
                        />
                    </InputContainer>

                    <UpdateButton activeOpacity={0.8} onPress={handleUpdate}>
                        <UpdateButtonText>SALVAR</UpdateButtonText>
                        <Feather name='arrow-right-circle' size={30} color={theme.colors.bgColor} style={{ position: "absolute", right: 30 }} />
                    </UpdateButton>
                </ContainerForm>
            </ContainerView>
        </Container>
    )
}

export default UpdateProfile