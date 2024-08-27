import React, { useContext, useEffect, useState } from 'react';
import { useTheme } from "styled-components";
import { ThemeContext } from '../../styles/themeContext';
import { ContainerInfo, ContainerInfoText, ContainerUser, CreatedText, CuteCat, HighlightedInfoText, HighlightedText, InfoText, InfoTitle, LogoutButton, ThanksText, ThemeButton, UserImage, UserName, UserNameButton } from './styled';
import { FontAwesome5, Feather } from '@expo/vector-icons'
import Navbar from '../../components/common/Navbar';
import useAuth from '../../hook/useAuth';
import { User as UserEntitie } from '../../entities/User';
import userService from '../../services/userService';
import getDate from '../../utils/getDate';
import Loader from '../Loader';
import { useNavigation } from '@react-navigation/native';
import { PropsStack } from '../../routes';
import { LinearGradient } from 'expo-linear-gradient';

const User = () => {
  const navigation = useNavigation<PropsStack>();
  const theme = useTheme();
  const { toggleTheme } = useContext(ThemeContext);
  const [userInfo, setUserInfo] = useState<UserEntitie | undefined>();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  }

  const handleUserInfo = async () => {
    const { data } = await userService.getUserProfile();

    setUserInfo(data);
  }

  useEffect(() => {
    handleUserInfo();
  }, [])

  const handleNavigateToUpdateProfile = () => {
    navigation.navigate("UpdateProfile", { userInfo: userInfo });
  }

  if (!userInfo) return <Loader type='load' />

  return (
    <LinearGradient
      colors={theme.colors.bgMainColor}
      style={{ flex: 1 }}
    >
      <ThemeButton onPress={toggleTheme}>
        <FontAwesome5 name='moon' size={30} color={theme.colors.text} />
      </ThemeButton>

      <LogoutButton onPress={handleLogout}>
        <Feather name='log-out' size={30} color={theme.colors.text} />
      </LogoutButton>

      <ContainerUser>
        <UserImage>
          <Feather name='plus' size={100} color={theme.colors.white} />
        </UserImage>

        <UserNameButton activeOpacity={0.85} onPress={handleNavigateToUpdateProfile}>
          <UserName>{userInfo?.name}</UserName>
          <FontAwesome5 name='edit' size={25} color={theme.colors.highlightColor} />
        </UserNameButton>

        <CreatedText>Usuário desde: <HighlightedText>{getDate(userInfo?.createdAt ?? '')}</HighlightedText></CreatedText>
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
    </LinearGradient>
  )
}

export default User;