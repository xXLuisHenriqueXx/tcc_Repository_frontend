import React from 'react';
import { ContainerButton, ContainerText, LoginButton, LoginButtonText, NormalText, OrContainer, OrLine, OrText, RegisterButton, RegisterButtonText, Title } from './styled';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import * as Haptics from 'expo-haptics';
import { ArrowRightCircle } from 'lucide-react-native';

interface WelcomeAccessProps {
    handleNavigateToLogin: () => void;
    handleNavigateToRegister: () => void;
}

const WelcomeAccess = ({ handleNavigateToLogin, handleNavigateToRegister }: WelcomeAccessProps) => {
    const theme = useTheme();

    return (
        <>
            <ContainerText>
                <Title>Enfim...</Title>
                <NormalText>
                    Após conhecer todas as vantagens de realizar o cadastro ou acessar a plataforma, selecione a operação que mais lhe serve.
                </NormalText>
            </ContainerText>

            <ContainerButton>
                <LoginButton onPress={() => {
                    Haptics.selectionAsync();

                    handleNavigateToLogin();
                }}>
                    <LoginButtonText>ACESSAR</LoginButtonText>
                    <ArrowRightCircle style={{ position: "absolute", right: RFValue(16) }} size={RFValue(26)} color={theme.colors.bgColor} strokeWidth={RFValue(2)} />
                </LoginButton>

                <OrContainer>
                    <OrLine />
                    <OrText>OU</OrText>
                    <OrLine />
                </OrContainer>

                <RegisterButton onPress={() => {
                    Haptics.selectionAsync();

                    handleNavigateToRegister();
                }}>
                    <RegisterButtonText>CADASTRAR</RegisterButtonText>
                    <ArrowRightCircle style={{ position: "absolute", right: RFValue(16) }} size={RFValue(26)} color={theme.colors.highlightColor} strokeWidth={RFValue(2)} />
                </RegisterButton>
            </ContainerButton>
        </>
    )
}

export default WelcomeAccess;