import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useTheme } from "styled-components";
import { ThemeContext } from '../../styles/themeContext';
import { AchievementBoxCompleted, AchievementBoxNotCompleted, AchievementImage, ContainerAchievements, ContainerAchievementsBoxRow, ContainerAchievementsBoxTitle, ContainerAchievementsGroupBox, ContainerAchievementsTitle, ContainerInfo, ContainerInfoBox, ContainerInfoBoxText, ContainerInfoBoxTitle, ContainerInfoGroupBox, ContainerInfoGroupBoxText, ContainerInfoGroupRow, ContainerLevel, ContainerLevelBar, ContainerLevelBarFill, ContainerLevelText, ContainerLevelTextBar, ContainerUser, CreatedText, HighlightedText, LogoutButton, ScrollContainer, ThemeButton, UserImagePlaceholder, UserName, UserNameButton } from './styled';
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
import { RFValue } from 'react-native-responsive-fontsize';
import { Achievement } from '../../entities/Achievement';
import achievementService from '../../services/achievementService';
import ModalInfo from '../../components/common/ModalInfo';

const User = () => {
  const navigation = useNavigation<PropsStack>();
  const theme = useTheme();
  const { toggleTheme } = useContext(ThemeContext);
  const [userInfo, setUserInfo] = useState<UserEntitie | undefined>();
  const [progress, setProgress] = useState<number>(0);
  const [achievementsNote, setAchievementsNote] = useState<Achievement[] | undefined>([]);
  const [achievementsTodo, setAchievementsTodo] = useState<Achievement[] | undefined>([]);
  const [achievementsTask, setAchievementsTask] = useState<Achievement[] | undefined>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | undefined>();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  }

  const handleCalculateProgress = (experience: number, experienceToNextLevel: number) => {
    const experiencePercentage = (experience / experienceToNextLevel) * 100;

    const progress = experiencePercentage.toFixed(2);

    return progress;
  }

  const handleUserInfo = async () => {
    const { data } = await userService.getUserProfile();

    setUserInfo(data);
    let progressValue = handleCalculateProgress(data.experience, data.experienceToNextLevel, );
  
    setProgress(parseFloat(progressValue));
  }

  useLayoutEffect(() => {
    handleUserInfo();
  }, []);

  const handleLoadAchievements = async () => {
    const { data } = await achievementService.getAll();

    handleFilterAchievements(data);
  }

  const handleFilterAchievements = (data: Achievement[]) => {
    const achievementsNote = data.filter(achievement => achievement.type === '_note');
    const achievementsTodo = data.filter(achievement => achievement.type === '_todo');
    const achievementsTask = data.filter(achievement => achievement.type === '_task');

    setAchievementsNote(achievementsNote);
    setAchievementsTodo(achievementsTodo);
    setAchievementsTask(achievementsTask);
  }

  useEffect(() => {
    if (userInfo) {
      handleLoadAchievements();
    }
  }, [userInfo]);

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
        <FontAwesome5 name='moon' size={RFValue(26)} color={theme.colors.text} />
      </ThemeButton>

      <LogoutButton onPress={handleLogout}>
        <Feather name='log-out' size={RFValue(26)} color={theme.colors.text} />
      </LogoutButton>

      <ScrollContainer showsVerticalScrollIndicator={false}>
        <ContainerUser>
          <UserImagePlaceholder>
            <Feather name='plus' size={100} color={theme.colors.white} />
          </UserImagePlaceholder>

          <UserNameButton onPress={handleNavigateToUpdateProfile}>
            <UserName>{userInfo?.name}</UserName>
            <FontAwesome5 name='edit' size={RFValue(20)} color={theme.colors.highlightColor} />
          </UserNameButton>

          <CreatedText>Usuário desde: <HighlightedText>{getDate(userInfo?.createdAt ?? '')}</HighlightedText></CreatedText>

          <ContainerLevel>
            <ContainerLevelText>Nível do usuário: <HighlightedText>{userInfo?.level}</HighlightedText></ContainerLevelText>
            <ContainerLevelBar>
              <ContainerLevelBarFill style={{ width: `${progress}%` }} />
            </ContainerLevelBar>
            <ContainerLevelTextBar>{userInfo?.experience} / {userInfo?.experienceToNextLevel}</ContainerLevelTextBar>
          </ContainerLevel>
        </ContainerUser>

        <ContainerInfo>
          <ContainerInfoGroupBox>
            <ContainerInfoGroupBoxText>Informações do usuário</ContainerInfoGroupBoxText>

            <ContainerInfoGroupRow>
              <ContainerInfoBox>
                <ContainerInfoBoxTitle>Alarmes</ContainerInfoBoxTitle>
                <ContainerInfoBoxText>Criados: <HighlightedText>0</HighlightedText></ContainerInfoBoxText>
                <ContainerInfoBoxText>Ativos: <HighlightedText>0</HighlightedText></ContainerInfoBoxText>
                <ContainerInfoBoxText>Deletados: <HighlightedText>0</HighlightedText></ContainerInfoBoxText>
              </ContainerInfoBox>

              <ContainerInfoBox>
                <ContainerInfoBoxTitle>Notas</ContainerInfoBoxTitle>
                <ContainerInfoBoxText>Criadas: <HighlightedText>{userInfo?.numberCreateNotes}</HighlightedText></ContainerInfoBoxText>
                <ContainerInfoBoxText>Atualizadas: <HighlightedText>{userInfo?.numberUpdateNotes}</HighlightedText></ContainerInfoBoxText>
                <ContainerInfoBoxText>Deletadas: <HighlightedText>{userInfo?.numberDeleteNotes}</HighlightedText></ContainerInfoBoxText>
              </ContainerInfoBox>
            </ContainerInfoGroupRow>

            <ContainerInfoGroupRow>
              <ContainerInfoBox>
                <ContainerInfoBoxTitle>Listas de tarefas</ContainerInfoBoxTitle>
                <ContainerInfoBoxText>Criadas: <HighlightedText>{userInfo?.numberCreateTodos}</HighlightedText></ContainerInfoBoxText>
                <ContainerInfoBoxText>Atualizadas: <HighlightedText>{userInfo?.numberUpdateTodos}</HighlightedText></ContainerInfoBoxText>
                <ContainerInfoBoxText>Deletadas: <HighlightedText>{userInfo?.numberDeleteTodos}</HighlightedText></ContainerInfoBoxText>
              </ContainerInfoBox>

              <ContainerInfoBox>
                <ContainerInfoBoxTitle>Tarefas</ContainerInfoBoxTitle>
                <ContainerInfoBoxText>Criadas: <HighlightedText>{userInfo?.numberCreateTasks}</HighlightedText></ContainerInfoBoxText>
                <ContainerInfoBoxText>Atualizadas: <HighlightedText>{userInfo?.numberUpdateTasks}</HighlightedText></ContainerInfoBoxText>
                <ContainerInfoBoxText>Deletadas: <HighlightedText>{userInfo?.numberDeleteTasks}</HighlightedText></ContainerInfoBoxText>
              </ContainerInfoBox>
            </ContainerInfoGroupRow>
          </ContainerInfoGroupBox>
        </ContainerInfo>

        <ContainerAchievements>
          <ContainerAchievementsTitle>Conquistas</ContainerAchievementsTitle>
          <ContainerAchievementsGroupBox>
            <ContainerAchievementsBoxTitle>Notas</ContainerAchievementsBoxTitle>
            <ContainerAchievementsBoxRow horizontal={true} showsHorizontalScrollIndicator={false}>
              {achievementsNote?.map(achievement => (
                userInfo?.achievements.includes(achievement._id) ? (
                  <AchievementBoxCompleted key={achievement._id} onPress={() => {
                    setModalVisible(true)
                    setSelectedAchievement(achievement)
                  }}>
                    <AchievementImage source={{ uri: achievement.imageUrl }} />
                  </AchievementBoxCompleted>
                ) : (
                  <AchievementBoxNotCompleted key={achievement._id} onPress={() => {
                    setModalVisible(true)
                    setSelectedAchievement(achievement)
                  }}>
                    <AchievementImage source={{ uri: achievement.imageUrl }} />
                  </AchievementBoxNotCompleted>
                )
              ))}
            </ContainerAchievementsBoxRow>

            <ContainerAchievementsBoxTitle>Listas de tarefas</ContainerAchievementsBoxTitle>
            <ContainerAchievementsBoxRow horizontal={true} showsHorizontalScrollIndicator={false}>
              {achievementsTodo?.map(achievement => (
                userInfo?.achievements.includes(achievement._id) ? (
                  <AchievementBoxCompleted key={achievement._id} onPress={() => {
                    setModalVisible(true)
                    setSelectedAchievement(achievement)
                  }}>
                    <AchievementImage source={{ uri: achievement.imageUrl }} />
                  </AchievementBoxCompleted>
                ) : (
                  <AchievementBoxNotCompleted key={achievement._id} onPress={() => {
                    setModalVisible(true)
                    setSelectedAchievement(achievement)
                  }}>
                    <AchievementImage source={{ uri: achievement.imageUrl }} />
                  </AchievementBoxNotCompleted>
                )
              ))}
            </ContainerAchievementsBoxRow>

            <ContainerAchievementsBoxTitle>Tarefas</ContainerAchievementsBoxTitle>
            <ContainerAchievementsBoxRow horizontal={true} showsHorizontalScrollIndicator={false}>
              {achievementsTask?.map(achievement => (
                userInfo?.achievements.includes(achievement._id) ? (
                  <AchievementBoxCompleted key={achievement._id} onPress={() => {
                    setModalVisible(true)
                    setSelectedAchievement(achievement)
                  }}>
                    <AchievementImage source={{ uri: achievement.imageUrl }} />
                  </AchievementBoxCompleted>
                ) : (
                  <AchievementBoxNotCompleted key={achievement._id} onPress={() => {
                    setModalVisible(true)
                    setSelectedAchievement(achievement)
                  }}>
                    <AchievementImage source={{ uri: achievement.imageUrl }} />
                  </AchievementBoxNotCompleted>
                )
              ))}
            </ContainerAchievementsBoxRow>
          </ContainerAchievementsGroupBox>
        </ContainerAchievements>

      </ScrollContainer>
      <Navbar screen='User' />
      <ModalInfo
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selected={selectedAchievement}
        setSelected={setSelectedAchievement}
      />
    </LinearGradient>
  )
}

export default User;