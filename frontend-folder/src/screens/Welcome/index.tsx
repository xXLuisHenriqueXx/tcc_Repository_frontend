import React from 'react'
import { BackButton, Container, ContainerButton, ContainerText, ContainerView, LoginButton, LoginButtonText, Logo, NormalText, RegisterButton, RegisterButtonText, Title } from './styled';
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { PropsStack } from '../../routes';

const logoImage = require("../../assets/logo_text.png");

const Welcome = () => {
  const theme = useTheme();
  const navigation = useNavigation<PropsStack>();

  return (
    <Container>
      <BackButton activeOpacity={0.8} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color={theme.colors.bgColor} />
      </BackButton>
      
      <ContainerView>
        <Logo source={logoImage} />

        <ContainerText>
          <Title>Bem vindo(a)!</Title>
          <NormalText>Para uma melhor experiência com as funções do aplicativo, realize seu login ou cadastro.</NormalText>
        </ContainerText>

        <ContainerButton>
          <LoginButton activeOpacity={0.8}>
            <LoginButtonText>ACESSAR</LoginButtonText>
            <Feather name='arrow-right-circle' size={30} color={theme.colors.bgColor} style={{position: "absolute", right: 30}} />
          </LoginButton>

          <RegisterButton activeOpacity={0.8}>
            <RegisterButtonText>CADASTRAR</RegisterButtonText>
            <Feather name='arrow-right-circle' size={30} color={theme.colors.highlightColor} style={{position: "absolute", right: 30}} />
          </RegisterButton>

        </ContainerButton>
      </ContainerView>
    </Container>
  )
}

export default Welcome;