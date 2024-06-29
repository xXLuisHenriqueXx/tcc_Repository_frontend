import React, { useContext } from 'react';
import { useTheme } from "styled-components";
import { ThemeContext } from '../../styles/themeContext';
import { Container, ContainerInfo, ContainerInfoText, ContainerUser, CreatedText, CuteCat, HighlightedInfoText, HighlightedText, InfoText, InfoTitle, ThanksText, ThemeButton, UserImage, UserName } from './styled';
import { FontAwesome } from '@expo/vector-icons'
import Navbar from '../../components/common/Navbar';

const User = () => {
  const theme = useTheme();
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <Container
      source={theme.images.bgMain}
    >
      <ThemeButton onPress={toggleTheme}>
        <FontAwesome name='moon-o' size={30} color={theme.colors.text} />
      </ThemeButton>

      <ContainerUser>
        <UserImage>
          <FontAwesome name='user' size={100} color={theme.colors.white} />
        </UserImage>

        <UserName>Username</UserName>

        <CreatedText>Usuário desde: <HighlightedText>DD/MM/AAAA</HighlightedText></CreatedText>
      </ContainerUser>

      <ContainerInfo>
        <InfoTitle>Informações do usuário</InfoTitle>

        <ContainerInfoText>
          <InfoText>Alarms criados: <HighlightedInfoText>X</HighlightedInfoText></InfoText>
          <InfoText>Notas criadas: <HighlightedInfoText>X</HighlightedInfoText></InfoText>
        </ContainerInfoText>

        <CuteCat source={theme.images.catImage} />

        <ThanksText>Obrigado pelo apoio!</ThanksText>
      </ContainerInfo>

      <Navbar screen='User' />
    </Container>
  )
}

export default User;