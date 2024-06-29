import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.ImageBackground`
    flex: 1;
    background-size: cover;
`;

export const ContainerUser = styled.View`
    width: 100%;
    height: ${RFValue(200)}px;
    margin-top: ${RFValue(20)}px;
    align-items: center;
    justify-content: center;
`;

export const UserImage = styled.View`
    width: ${RFValue(120)}px;
    height: ${RFValue(120)}px;;
    border-width: ${RFValue(2)}px;
    border-color: ${({ theme }) => theme.colors.highlightColor};
    border-radius: ${RFValue(75)}px;
    background-color: #110F1F;
    align-items: center;
    justify-content: center;
`;

export const UserName = styled.Text`
    font-size: ${RFValue(30)}px;
    color: ${({ theme }) => theme.colors.highlightColor};
    margin-top: ${RFValue(4)}px;
    font-weight: bold;
`;

export const CreatedText = styled.Text`
    font-size: ${RFValue(15)}px;
    color: ${({ theme }) => theme.colors.text};
`;

export const HighlightedText = styled.Text`
    color: ${({ theme }) => theme.colors.highlightColor};
`;

export const ContainerInfo = styled.View`
    width: 92%;
    height: ${RFValue(400)}px;
    border-width: ${RFValue(2)}px;
    border-color: ${({ theme }) => theme.colors.bdColor};
    border-radius: ${RFValue(20)}px;
    margin-top: ${RFValue(10)}px;
    padding: ${RFValue(20)}px;
    align-self: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.bgContainerColorInactive};
`;

export const ThemeButton = styled.TouchableOpacity`
    position: absolute;
    top: ${RFValue(10)}px;
    right: ${RFValue(10)}px;
    `;

export const InfoTitle = styled.Text`
    font-size: ${RFValue(20)}px;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
    margin-bottom: ${RFValue(12)}px;
    text-transform: uppercase;
`;

export const ContainerInfoText = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-top-width: ${RFValue(2)}px;
    border-bottom-width: ${RFValue(2)}px;
    border-color: ${({ theme }) => theme.colors.bdColor};
    `;

export const InfoText = styled.Text`
    font-size: ${RFValue(12)}px;
    color: ${({ theme }) => theme.colors.text};
    margin: ${RFValue(15)}px;
    `;

export const HighlightedInfoText = styled.Text`
    color: ${({ theme }) => theme.colors.highlightColor};
`;

export const CuteCat = styled.Image`
        width: ${RFValue(275)}px;
        height: ${RFValue(201)}px;
        margin-top: ${RFValue(20)}px;
`;

export const ThanksText = styled.Text`
    font-size: ${RFValue(20)}px;
    color: ${({ theme }) => theme.colors.highlightColor};
    font-weight: bold;
    margin-top: ${RFValue(2)}px;
`;
