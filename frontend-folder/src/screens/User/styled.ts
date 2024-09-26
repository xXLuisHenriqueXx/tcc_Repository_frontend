import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const ScrollContainer = styled.ScrollView`
    flex: 1;
    margin: ${RFValue(40)}px ${RFValue(16)}px;
    margin-bottom: ${RFValue(72)}px;
`;

export const ContainerUser = styled.View`
    width: 100%;
    height: auto;
    align-items: center;
    justify-content: center;
    padding-bottom: ${RFValue(16)}px;
    border-bottom-width: ${RFValue(2)}px;
    border-bottom-color: ${({ theme }) => theme.colors.bdColor};
`;

export const UserImagePlaceholder = styled.View`
    width: ${RFValue(120)}px;
    height: ${RFValue(120)}px;;
    border: ${RFValue(4)}px solid ${({ theme }) => theme.colors.highlightColor};
    border-radius: ${RFValue(60)}px;
    background-color: #110F1F;
    align-items: center;
    justify-content: center;
`;

export const UserImage = styled.Image.attrs({
    resizeMode: 'cover'
})`
    width: ${RFValue(120)}px;
    height: ${RFValue(120)}px;
    border-radius: ${RFValue(60)}px;
    border: ${RFValue(4)}px solid ${({ theme }) => theme.colors.highlightColor};
    border-radius: ${RFValue(60)}px;
`;

export const UserNameButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
    flex-direction: row;
    align-items: center;
`;

export const UserName = styled.Text`
    font-size: ${RFValue(24)}px;
    color: ${({ theme }) => theme.colors.highlightColor};
    margin-top: ${RFValue(5)}px;
    font-weight: bold;
    margin-right: ${RFValue(5)}px;
`;

export const CreatedText = styled.Text`
    font-size: ${RFValue(12)}px;
    color: ${({ theme }) => theme.colors.text};
`;

export const HighlightedText = styled.Text`
    color: ${({ theme }) => theme.colors.highlightColor};
`;

export const ContainerInfo = styled.View`
    width: 100%;
    height: auto;
    align-items: center;
    margin-top: ${RFValue(16)}px;
`;

export const ContainerLevel = styled.View`
    width: 100%;
    height: auto;
    flex-direction: column;
    align-items: center;
    margin-top: ${RFValue(16)}px;
`;

export const ContainerLevelText = styled.Text`
    font-size: ${RFValue(16)}px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${RFValue(4)}px;
`;

export const ContainerLevelBar = styled.View`
    width: 100%;
    height: ${RFValue(16)}px;
    background-color: ${({ theme }) => theme.colors.text};
    border-radius: ${RFValue(8)}px;
    align-items: start;
    justify-content: center;
    padding: 0 ${RFValue(4)}px;
    margin-bottom: ${RFValue(2)}px;
`;

export const ContainerLevelBarFill = styled.View`
    height: ${RFValue(8)}px;
    background-color: ${({ theme }) => theme.colors.highlightColor};
    border-radius: ${RFValue(6)}px;
`;

export const ContainerLevelTextBar = styled.Text`
    font-size: ${RFValue(12)}px;
    font-weight: 300;
    color: ${({ theme }) => theme.colors.text};
`;

export const ContainerInfoGroupBox = styled.View`
    width: 100%;
    height: auto;
    flex-direction: column;
    align-items: center;
`;

export const ContainerInfoGroupBoxText = styled.Text`
    width: 100%;
    font-size: ${RFValue(16)}px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${RFValue(8)}px;
    text-align: start;
`;

export const ContainerInfoGroupRow = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: center;
    gap: ${RFValue(16)}px;
    margin-bottom: ${RFValue(16)}px;
`;

export const ContainerInfoBox = styled.View`
    width: 47%;
    height: ${RFValue(100)}px;
    background-color: ${({ theme }) => theme.colors.bgContainerColorActive};
    border-top-width: ${RFValue(4)}px;
    border-top-color: ${({ theme }) => theme.colors.highlightColor};
    border-radius: ${RFValue(5)}px;
    align-items: center;
    justify-content: center;
    padding: ${RFValue(8)}px;
`;

export const ContainerInfoBoxTitle = styled.Text`
    font-size: ${RFValue(14)}px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.highlightColor};
    text-align: center;
    margin-bottom: ${RFValue(8)}px;
`;

export const ContainerInfoBoxText = styled.Text`
    font-size: ${RFValue(12)}px;
    color: ${({ theme }) => theme.colors.text};
    margin: 0 ${RFValue(8)}px;
`;

export const ContainerAchievements = styled.View`
    width: 100%;
    height: auto;
    align-items: center;
    margin-top: ${RFValue(16)}px;
`;

export const ContainerAchievementsTitle = styled.Text`
    width: 100%;
    font-size: ${RFValue(16)}px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${RFValue(8)}px;
    text-align: start;
`;

export const ContainerAchievementsGroupBox = styled.View`
    width: 100%;
    height: auto;
    background-color: ${({ theme }) => theme.colors.bgContainerColorActive};
    border-radius: ${RFValue(5)}px;
    flex-direction: column;
    align-items: center;
    padding: ${RFValue(8)}px;
`;

export const ContainerAchievementsBoxTitle = styled.Text`
    width: 100%;
    font-size: ${RFValue(14)}px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.highlightColor};
    text-align: start;
    padding: ${RFValue(8)}px 0;
`;

export const ContainerAchievementsBoxRow = styled.ScrollView`
    width: 100%;
    height: auto;
`;

export const AchievementBoxNotCompleted = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
    width: ${RFValue(60)}px;
    height: ${RFValue(60)}px;
    background-color: ${({ theme }) => theme.colors.bgContainerColorInactive};
    border-radius: ${RFValue(30)}px;
    align-items: center;
    justify-content: center;
    margin: 0 ${RFValue(4)}px;
`;

export const AchievementBoxCompleted = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
    width: ${RFValue(60)}px;
    height: ${RFValue(60)}px;
    background-color: ${({ theme }) => theme.colors.highlightColor};
    border-radius: ${RFValue(30)}px;
    align-items: center;
    justify-content: center;
    margin: 0 ${RFValue(4)}px;
`;

export const AchievementImage = styled.Image.attrs({
    resizeMode: 'cover'
})`
    width: ${RFValue(50)}px;
    height: ${RFValue(50)}px;
    border-radius: ${RFValue(30)}px;
`;