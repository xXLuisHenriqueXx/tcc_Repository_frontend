import React, { useState } from 'react'
import { BackButton, Container, ContainerForm, ContainerText, ContainerView, Input, InputContainer, LoginButton, LoginButtonText, NormalText, Title } from './styled'
import { Feather, Entypo } from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native'
import { PropsStack } from '../../routes'
import { useTheme } from 'styled-components'
import useAuth from '../../hook/useAuth'
import { Alert } from 'react-native'

interface fieldsProps {
    email: string;
    password: string;
}

const Login = () => {
    const navigation = useNavigation<PropsStack>();
    const theme = useTheme();
    const [fields, setFields] = useState<fieldsProps>({
        email: "",
        password: ""
    })

    const { login } = useAuth();

    const handleLogin = () => {
        if (!fields.email || !fields.password) {
            Alert.alert("Aviso", "Preencha todos os campos!");
            return;
        }

        login(fields.email, fields.password);
    }

    return (
        <Container>
            <BackButton activeOpacity={0.8} onPress={() => navigation.goBack()}>
                <Feather name="arrow-left" size={24} color={theme.colors.bgColor} />
            </BackButton>

            <ContainerView>
                <ContainerText>
                    <Title>Que bom te ver novamente!</Title>
                    <NormalText>Para prosseguir realize o login nos campos abaixo!</NormalText>
                </ContainerText>

                <ContainerForm>
                    <InputContainer>
                        <Entypo name="mail" size={25} color={theme.colors.highlightColor} />
                        <Input
                            placeholder='Digite seu email...'
                            placeholderTextColor={theme.colors.textInactive}
                            value={fields.email}
                            onChangeText={(text) => {
                                setFields({ ...fields, email: text })
                            }}
                        />
                    </InputContainer>

                    <InputContainer>
                        <Entypo name="lock" size={25} color={theme.colors.highlightColor} />
                        <Input
                            placeholder='Digite sua senha...'
                            placeholderTextColor={theme.colors.textInactive}
                            value={fields.password}
                            onChangeText={(text) => {
                                setFields({ ...fields, password: text })
                            }}
                        />
                    </InputContainer>

                    <LoginButton activeOpacity={0.8} onPress={handleLogin}>
                        <LoginButtonText>ACESSAR</LoginButtonText>
                        <Feather name='arrow-right-circle' size={30} color={theme.colors.bgColor} style={{ position: "absolute", right: 30 }} />
                    </LoginButton>
                </ContainerForm>
            </ContainerView>
        </Container>
    )
}

export default Login;