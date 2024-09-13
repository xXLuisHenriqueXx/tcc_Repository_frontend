import React from 'react';
import { BackButton, Container, ContainerButton, ContainerText, ContainerView, LoginButton, LoginButtonText, Logo, NormalText, OrContainer, OrLine, OrText, RegisterButton, RegisterButtonText, Title } from './styled';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

import { PropsStack } from '../../routes';

const logoImage = require("../../assets/logo_text.png");

const Welcome = () => {
  const theme = useTheme();
  const navigation = useNavigation<PropsStack>();

  const handleNavigateToLogin = () => {
    navigation.navigate("Login");
  }

  const handleNavigateToRegister = () => {
    navigation.navigate("Register");
  }

  return (
    <Container>
      <BackButton onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={RFValue(20)} color={theme.colors.bgColor} />
      </BackButton>

      <ContainerView>
        <Logo source={logoImage} />

        <ContainerText>
          <Title>Bem vindo(a)!</Title>
          <NormalText>Para uma melhor experiência com as funções do aplicativo, realize seu login ou cadastro.</NormalText>
        </ContainerText>

        <ContainerButton
          from={{ translateY: 300, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{
            type: 'timing',
            duration: 200,
          }}
        >
          <LoginButton onPress={handleNavigateToLogin}>
            <LoginButtonText>ACESSAR</LoginButtonText>
            <Feather name='arrow-right-circle' size={RFValue(26)} color={theme.colors.bgColor} style={{ position: "absolute", right: RFValue(16) }} />
          </LoginButton>

          <OrContainer>
            <OrLine />
            <OrText>OU</OrText>
            <OrLine />
          </OrContainer>

          <RegisterButton onPress={handleNavigateToRegister}>
            <RegisterButtonText>CADASTRAR</RegisterButtonText>
            <Feather name='arrow-right-circle' size={RFValue(26)} color={theme.colors.highlightColor} style={{ position: "absolute", right: RFValue(16) }} />
          </RegisterButton>
        </ContainerButton>
      </ContainerView>
    </Container>
  )
}

export default Welcome;