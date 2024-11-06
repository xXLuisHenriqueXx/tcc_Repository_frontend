import React, { useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { BackButton, Container, ContainerForm, ContainerText, ContainerView, ForgotPasswordButton, ForgotPasswordText, GoogleButton, GoogleButtonText, Input, InputContainer, LoginButton, LoginButtonText, NormalText, OrContainer, OrLine, OrText, Title } from './styled';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { FontAwesome } from '@expo/vector-icons';
import { ArrowLeft, ArrowRightCircle, Lock, Mail } from 'lucide-react-native';

import { PropsStack } from '../../../routes';
import useAuth from '../../../hook/useAuth';

interface fieldsProps {
    email: string;
    password: string;
}

const Login = () => {
    const navigation = useNavigation<PropsStack>();
    const theme = useTheme();
    const { login } = useAuth();

    const [fields, setFields] = useState<fieldsProps>({
        email: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const handleLogin = async () => {
        setIsLoading(true);

        try {
            const trimmedEmail = fields.email.trim();
            const trimmedPassword = fields.password.trim();

            if (!trimmedEmail || !trimmedPassword) {
                Alert.alert("Aviso", "Preencha todos os campos!");
                return;
            }

            await login(trimmedEmail, trimmedPassword);
        } catch (error) {
            Alert.alert("Erro", "Erro ao realizar login!");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Container>
            <BackButton onPress={() => navigation.goBack()}>
                <ArrowLeft size={RFValue(20)} color={theme.colors.bgColor} strokeWidth={RFValue(2)} />
            </BackButton>

            <ContainerView>
                <ContainerText>
                    <Title>Que bom te ver de novo!</Title>
                    <NormalText>Para prosseguir realize o login nos campos abaixo!</NormalText>
                </ContainerText>

                <ContainerForm
                    from={{ translateY: 300, opacity: 0 }}
                    animate={{ translateY: 0, opacity: 1 }}
                    transition={{ type: 'timing', duration: 200 }}
                >
                    <InputContainer>
                        <Mail size={RFValue(22)} color={theme.colors.highlightColor} strokeWidth={RFValue(2)} />
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
                        <Lock size={RFValue(22)} color={theme.colors.highlightColor} strokeWidth={RFValue(2)} />
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
                        {!isLoading ? (
                            <>
                                <LoginButtonText>ACESSAR</LoginButtonText>
                                <ArrowRightCircle style={{ position: "absolute", right: RFValue(16) }} size={RFValue(26)} color={theme.colors.bgColor} strokeWidth={RFValue(2)} />
                            </>
                        ) : (
                            <ActivityIndicator size={RFValue(26)} color={theme.colors.bgColor} />
                        )

                        }
                    </LoginButton>
                    <ForgotPasswordButton>
                        <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
                    </ForgotPasswordButton>

                    <OrContainer>
                        <OrLine />
                        <OrText>OU</OrText>
                        <OrLine />
                    </OrContainer>

                    <GoogleButton>
                        <FontAwesome name="google" size={RFValue(20)} color={theme.colors.highlightColor} style={{ position: "absolute", left: RFValue(16) }} />
                        <GoogleButtonText>ACESSAR COM GOOGLE</GoogleButtonText>
                        <ArrowRightCircle style={{ position: "absolute", right: RFValue(16) }} size={RFValue(26)} color={theme.colors.bgColor} strokeWidth={RFValue(2)} />
                    </GoogleButton>
                </ContainerForm>
            </ContainerView>
        </Container>
    )
}

export default Login;