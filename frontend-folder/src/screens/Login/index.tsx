import React, { useState } from 'react'
import { BackButton, Container, ContainerForm, ContainerText, ContainerView, Input, InputContainer, LoginButton, LoginButtonText, NormalText, Title } from './styled'
import { Feather, Entypo } from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native'
import { PropsStack } from '../../routes'
import { useTheme } from 'styled-components'
import useAuth from '../../hook/useAuth'
import { Alert } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import Loader from '../Loader'

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
    });
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();

    const handleLogin = () => {
        setIsLoading(true);

        try {
            const trimmedEmail = fields.email.trim();
            const trimmedPassword = fields.password.trim();

            if (!trimmedEmail || !trimmedPassword) {
                Alert.alert("Aviso", "Preencha todos os campos!");
                return;
            }

            login(trimmedEmail, trimmedPassword);
        } catch (error) {
            Alert.alert("Erro", "Erro ao realizar login!");
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) return <Loader type='load' />

    return (
        <Container>
            <BackButton
                onPress={() => navigation.goBack()}
            >
                <Feather name="arrow-left" size={RFValue(20)} color={theme.colors.bgColor} />
            </BackButton>

            <ContainerView>
                <ContainerText>
                    <Title>Que bom te ver de novo!</Title>
                    <NormalText>Para prosseguir realize o login nos campos abaixo!</NormalText>
                </ContainerText>

                <ContainerForm
                    from={{translateY: 300, opacity: 0}}
                    animate={{translateY: 0, opacity: 1}}
                    transition={{
                        type: 'timing',
                        duration: 200,
                    }}
                >
                    <InputContainer>
                        <Entypo name="mail" size={RFValue(22)} color={theme.colors.highlightColor} />
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
                        <Entypo name="lock" size={RFValue(22)} color={theme.colors.highlightColor} />
                        <Input
                            placeholder='Digite sua senha...'
                            placeholderTextColor={theme.colors.textInactive}
                            value={fields.password}
                            onChangeText={(text) => {
                                setFields({ ...fields, password: text })
                            }}
                            secureTextEntry
                        />
                    </InputContainer>

                    <LoginButton onPress={handleLogin} disabled={isLoading}>
                        <LoginButtonText>ACESSAR</LoginButtonText>
                        <Feather name='arrow-right-circle' size={RFValue(26)} color={theme.colors.bgColor} style={{ position: "absolute", right: RFValue(16) }} />
                    </LoginButton>
                </ContainerForm>
            </ContainerView>
        </Container>
    )
}

export default Login;