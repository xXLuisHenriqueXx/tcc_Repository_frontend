import React, { useEffect, useState } from 'react'
import { BackButton, Container, ContainerForm, ContainerText, ContainerView, Input, InputContainer, NormalText, Title, UpdateButton, UpdateButtonText } from './styled';
import { Feather, Entypo } from "@expo/vector-icons"
import { useTheme } from 'styled-components';
import userService from '../../services/userService';
import { Alert } from 'react-native';
import useAuth from '../../hook/useAuth';
import { useNavigation } from '@react-navigation/native';
import { PropsNavigationStack, PropsStack } from '../../routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Loader from '../Loader';
import { RFValue } from 'react-native-responsive-fontsize';

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
    });
    const [isLoading, setIsLoading] = useState(false);

    const { logout } = useAuth();
    const { userInfo } = route.params || {};

    const handleUpdate = async () => {
        if (fields.name === "") {
            Alert.alert("Erro", "Digite um nome!");
            return;
        } else if (fields.email === "") {
            Alert.alert("Erro", "Digite um email!");
            return;
        } else {
            setIsLoading(true);

            const response = await userService.updateUserProfile(fields);

            setIsLoading(false);

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

    if (isLoading) return <Loader type='save' />

    return (
        <Container>
            <BackButton onPress={() => navigation.goBack()}>
                <Feather name="arrow-left" size={RFValue(20)} color={theme.colors.bgColor} />
            </BackButton>

            <ContainerView>
                <ContainerText>
                    <Title>Edição de perfil</Title>
                    <NormalText>Nesta tela você pode editar seus credenciais.</NormalText>
                </ContainerText>

                <ContainerForm>
                    <InputContainer>
                        <Entypo name="user" size={RFValue(22)} color={theme.colors.highlightColor} />
                        <Input
                            value={fields.name}
                            onChangeText={(text) => {
                                setFields({ ...fields, name: text })
                            }}
                        />
                    </InputContainer>

                    <InputContainer>
                        <Entypo name="mail" size={RFValue(22)} color={theme.colors.highlightColor} />
                        <Input
                            value={fields.email}
                            onChangeText={(text) => {
                                setFields({ ...fields, email: text })
                            }}
                        />
                    </InputContainer>

                    <InputContainer>
                        <Entypo name="lock" size={RFValue(22)} color={theme.colors.highlightColor} />
                        <Input
                            placeholder='Digite sua senha atual...'
                            placeholderTextColor={theme.colors.textInactive}
                            secureTextEntry
                        />
                    </InputContainer>

                    <InputContainer>
                        <Entypo name="lock" size={RFValue(22)} color={theme.colors.highlightColor} />
                        <Input
                            placeholder='Digite sua nova senha...'
                            placeholderTextColor={theme.colors.textInactive}
                            secureTextEntry
                        />
                    </InputContainer>

                    <InputContainer>
                        <Entypo name="lock" size={RFValue(22)} color={theme.colors.highlightColor} />
                        <Input
                            placeholder='Digite sua nova senha novamente...'
                            placeholderTextColor={theme.colors.textInactive}
                            secureTextEntry
                        />
                    </InputContainer>

                    <UpdateButton onPress={handleUpdate}>
                        <UpdateButtonText>SALVAR</UpdateButtonText>
                        <Feather name='arrow-right-circle' size={RFValue(26)} color={theme.colors.bgColor} style={{ position: "absolute", right: RFValue(16) }} />
                    </UpdateButton>
                </ContainerForm>
            </ContainerView>
        </Container>
    )
}

export default UpdateProfile