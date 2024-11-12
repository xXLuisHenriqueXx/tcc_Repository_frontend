import React, { useEffect, useState } from 'react';
import { Alert, RefreshControl } from 'react-native';
import { AchievementBoxCompleted, AchievementBoxNotCompleted, AchievementImage, ContainerAchievements, ContainerAchievementsBoxRow, ContainerAchievementsBoxTitle, ContainerAchievementsGroupBox, ContainerAchievementsTitle, ContainerInfo, ContainerInfoBox, ContainerInfoBoxText, ContainerInfoBoxTitle, ContainerInfoGroupBox, ContainerInfoGroupBoxText, ContainerInfoGroupRow, ContainerLevel, ContainerLevelBar, ContainerLevelBarFill, ContainerLevelText, ContainerLevelTextBar, ContainerUser, CreatedText, HighlightedText, ScrollContainer, UserImagePlaceholder, UserName, UserNameButton } from './styled';
import { useTheme } from "styled-components/native";
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { MotiView } from 'moti';
import * as Haptics from 'expo-haptics';

import Loader from '../../Loader';
import ModalInfo from '../../../components/common/ModalInfo';
import { User as UserEntitie } from '../../../entities/User';
import userService from '../../../services/userService';
import getDate from '../../../utils/getDate';
import { PropsStack } from '../../../routes';
import { Achievement } from '../../../entities/Achievement';
import achievementService from '../../../services/achievementService';
import ContainerGradient from '../../../components/common/ContainerGradient';
import { Bell, BookmarkCheck, Pencil, Plus, StickyNote } from 'lucide-react-native';

const User = () => {
  const navigation = useNavigation<PropsStack>();
  const theme = useTheme();

  const [userInfo, setUserInfo] = useState<UserEntitie | undefined>();
  const [progress, setProgress] = useState<number>(0);
  const [achievementsAlarm, setAchievementsAlarm] = useState<Achievement[] | undefined>([]);
  const [achievementsNote, setAchievementsNote] = useState<Achievement[] | undefined>([]);
  const [achievementsTodo, setAchievementsTodo] = useState<Achievement[] | undefined>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    handleUserInfo();
  }, []);

  const handleUserInfo = async () => {
    setIsLoading(true);

    try {
      const { data } = await userService.getUserProfile();

      setUserInfo(data);

      let progressValue = handleCalculateProgress(data.experience, data.experienceToNextLevel,);
      setProgress(parseFloat(progressValue));
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar informações do usuário');
    } finally {
      setIsLoading(false);
    }
  }

  const handleCalculateProgress = (experience: number, experienceToNextLevel: number) => {
    const experiencePercentage = (experience / experienceToNextLevel) * 100;

    const progress = experiencePercentage.toFixed(2);

    return progress;
  }

  useEffect(() => {
    if (userInfo) {
      handleLoadAchievements();
    }
  }, [userInfo]);

  const handleLoadAchievements = async () => {
    const { data } = await achievementService.getAll();

    handleFilterAchievements(data);
  }

  const handleFilterAchievements = (data: Achievement[]) => {
    const achievementsAlarm = data.filter(achievement => achievement.type === '_alarm');
    const achievementsNote = data.filter(achievement => achievement.type === '_note');
    const achievementsTodo = data.filter(achievement => achievement.type === '_todo');

    setAchievementsAlarm(achievementsAlarm);
    setAchievementsNote(achievementsNote);
    setAchievementsTodo(achievementsTodo);
  }

  const handleNavigateToUpdateProfile = () => {
    Haptics.selectionAsync();

    navigation.navigate("UpdateProfile", { userInfo: userInfo });
  }

  if (isLoading) return <Loader type='load' />

  return (
    <ContainerGradient screen='User'>
      <ScrollContainer
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleUserInfo} />
        }
      >
        <ContainerUser>
          <UserImagePlaceholder>
            <Plus size={RFValue(90)} color={theme.colors.white} strokeWidth={RFValue(2)} />
          </UserImagePlaceholder>

          <UserNameButton onPress={handleNavigateToUpdateProfile}>
            <UserName>{userInfo?.name}</UserName>
            <Pencil size={RFValue(20)} color={theme.colors.highlightColor} strokeWidth={RFValue(2)} />
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

        <MotiView
          from={{ translateX: -300, opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          transition={{ type: 'timing', duration: 200 }}>
          <ContainerInfo>
            <ContainerInfoGroupBox>
              <ContainerInfoGroupBoxText>Informações do usuário</ContainerInfoGroupBoxText>

              <ContainerInfoGroupRow>
                <ContainerInfoBox>
                  <ContainerInfoBoxTitle>
                    <Bell size={RFValue(10)} color={theme.colors.highlightColor} strokeWidth={RFValue(2)} />
                    Alarmes
                  </ContainerInfoBoxTitle>
                  <ContainerInfoBoxText>Criados: <HighlightedText>{userInfo?.numberCreateAlarms}</HighlightedText></ContainerInfoBoxText>
                  <ContainerInfoBoxText>Atualizados: <HighlightedText>{userInfo?.numberUpdateAlarms}</HighlightedText></ContainerInfoBoxText>
                  <ContainerInfoBoxText>Deletados: <HighlightedText>{userInfo?.numberDeleteAlarms}</HighlightedText></ContainerInfoBoxText>
                </ContainerInfoBox>

                <ContainerInfoBox>
                  <ContainerInfoBoxTitle>
                    <StickyNote size={RFValue(10)} color={theme.colors.highlightColor} strokeWidth={RFValue(2)} />
                    Notas
                  </ContainerInfoBoxTitle>
                  <ContainerInfoBoxText>Criadas: <HighlightedText>{userInfo?.numberCreateNotes}</HighlightedText></ContainerInfoBoxText>
                  <ContainerInfoBoxText>Atualizadas: <HighlightedText>{userInfo?.numberUpdateNotes}</HighlightedText></ContainerInfoBoxText>
                  <ContainerInfoBoxText>Deletadas: <HighlightedText>{userInfo?.numberDeleteNotes}</HighlightedText></ContainerInfoBoxText>
                </ContainerInfoBox>
              </ContainerInfoGroupRow>

              <ContainerInfoGroupRow>
                <ContainerInfoBox>
                  <ContainerInfoBoxTitle>
                    <BookmarkCheck size={RFValue(10)} color={theme.colors.highlightColor} strokeWidth={RFValue(2)} />
                    Listas de tarefas
                  </ContainerInfoBoxTitle>
                  <ContainerInfoBoxText>Criadas: <HighlightedText>{userInfo?.numberCreateTodos}</HighlightedText></ContainerInfoBoxText>
                  <ContainerInfoBoxText>Atualizadas: <HighlightedText>{userInfo?.numberUpdateTodos}</HighlightedText></ContainerInfoBoxText>
                  <ContainerInfoBoxText>Deletadas: <HighlightedText>{userInfo?.numberDeleteTodos}</HighlightedText></ContainerInfoBoxText>
                </ContainerInfoBox>
              </ContainerInfoGroupRow>
            </ContainerInfoGroupBox>
          </ContainerInfo>
        </MotiView>

        <MotiView
          from={{ translateX: 300, opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          transition={{ type: 'timing', duration: 200 }}>
          <ContainerAchievements>
            <ContainerAchievementsTitle>Conquistas</ContainerAchievementsTitle>
            <ContainerAchievementsGroupBox>
              <ContainerAchievementsBoxTitle>Alarmes</ContainerAchievementsBoxTitle>
              <ContainerAchievementsBoxRow horizontal={true} showsHorizontalScrollIndicator={false}>
                {achievementsAlarm?.map(achievement => (
                  userInfo?.achievements.includes(achievement._id) ? (
                    <AchievementBoxCompleted key={achievement._id} onPress={() => {
                      Haptics.selectionAsync();

                      setModalVisible(true)
                      setSelectedAchievement(achievement)
                    }}>
                      <AchievementImage source={{ uri: achievement.imageUrl }} />
                    </AchievementBoxCompleted>
                  ) : (
                    <AchievementBoxNotCompleted key={achievement._id} onPress={() => {
                      Haptics.selectionAsync();

                      setModalVisible(true)
                      setSelectedAchievement(achievement)
                    }}>
                      <AchievementImage source={{ uri: achievement.imageUrl }} />
                    </AchievementBoxNotCompleted>
                  )
                ))}
              </ContainerAchievementsBoxRow>

              <ContainerAchievementsBoxTitle>Notas</ContainerAchievementsBoxTitle>
              <ContainerAchievementsBoxRow horizontal={true} showsHorizontalScrollIndicator={false}>
                {achievementsNote?.map(achievement => (
                  userInfo?.achievements.includes(achievement._id) ? (
                    <AchievementBoxCompleted key={achievement._id} onPress={() => {
                      Haptics.selectionAsync();

                      setModalVisible(true)
                      setSelectedAchievement(achievement)
                    }}>
                      <AchievementImage source={{ uri: achievement.imageUrl }} />
                    </AchievementBoxCompleted>
                  ) : (
                    <AchievementBoxNotCompleted key={achievement._id} onPress={() => {
                      Haptics.selectionAsync();

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
                      Haptics.selectionAsync();

                      setModalVisible(true)
                      setSelectedAchievement(achievement)
                    }}>
                      <AchievementImage source={{ uri: achievement.imageUrl }} />
                    </AchievementBoxCompleted>
                  ) : (
                    <AchievementBoxNotCompleted key={achievement._id} onPress={() => {
                      Haptics.selectionAsync();
                      
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
        </MotiView>

      </ScrollContainer>
      <ModalInfo
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selected={selectedAchievement}
        setSelected={setSelectedAchievement}
      />
    </ContainerGradient>
  )
}

export default User;