import React, { useState } from 'react';
import { BackButton, Container, ContainerButton, ContainerText, ContainerView, LoginButton, LoginButtonText, Logo, NormalText, OrContainer, OrLine, OrText, RegisterButton, RegisterButtonText, Title } from './styled';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

import { PropsStack } from '../../../routes';
import { ArrowLeft } from 'lucide-react-native';
import { WelcomeComponent } from '../../../components/Welcome';

const Welcome = () => {
  const theme = useTheme();
  const navigation = useNavigation<PropsStack>();
  const [currentScreen, setCurrentScreen] = useState(0);

  const handleNext = () => {
    setCurrentScreen((prev) => (prev < 5 ? prev + 1 : 5));
  };

  const handlePrevious = () => {
    setCurrentScreen((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNavigateToLogin = () => {
    navigation.navigate("Login");
  }

  const handleNavigateToRegister = () => {
    navigation.navigate("Register");
  }

  return (
    <>
      {/* <ContainerView>
        <Logo source={logoImage} />

        <ContainerText>
          <Title>Bem vindo(a)!</Title>
          <NormalText>Para uma melhor experiência com as funções do aplicativo, realize seu login ou cadastro.</NormalText>
        </ContainerText>

        <ContainerButton
          from={{ translateY: 300, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: 'timing', duration: 200 }}
        >
          <LoginButton onPress={handleNavigateToLogin}>
            <LoginButtonText>ACESSAR</LoginButtonText>
            <ArrowLeftCircle style={{ position: "absolute", right: RFValue(16) }} size={RFValue(26)} color={theme.colors.bgColor} strokeWidth={RFValue(2)} />
          </LoginButton>

          <OrContainer>
            <OrLine />
            <OrText>OU</OrText>
            <OrLine />
          </OrContainer>

          <RegisterButton onPress={handleNavigateToRegister}>
            <RegisterButtonText>CADASTRAR</RegisterButtonText>
            <ArrowLeftCircle style={{ position: "absolute", right: RFValue(16) }} size={RFValue(26)} color={theme.colors.bgColor} strokeWidth={RFValue(2)} />
          </RegisterButton>
        </ContainerButton>
      </ContainerView> */}

      {currentScreen === 0 && (
        <WelcomeComponent.RootNoImage>
          <WelcomeComponent.Main />

          <WelcomeComponent.Controllers currentScreen={currentScreen} handleNext={handleNext} handlePrevious={handlePrevious} />
        </WelcomeComponent.RootNoImage>
      )}

      {currentScreen === 1 && (
        <WelcomeComponent.RootNoImage>
          <WelcomeComponent.RootImage image={theme.images.bgWelcomeAlarms}>
            <WelcomeComponent.Controllers currentScreen={currentScreen} handleNext={handleNext} handlePrevious={handlePrevious} />
          </WelcomeComponent.RootImage>
        </WelcomeComponent.RootNoImage>
      )}


    </>
  )
}

export default Welcome;