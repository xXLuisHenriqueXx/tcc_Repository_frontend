import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.ImageBackground`
    flex: 1;
    background-size: cover;
`;

export const ContainerHeader = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    padding: ${RFValue(9)}px;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(20)}px;
    font-weight: 500;
    margin-left: auto;
`;

export const BackButton = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.highlightColor};
    border-radius: ${RFValue(50)}px;
    width: ${RFValue(50)}px;
    height: ${RFValue(50)}px;
    justify-content: center;
    align-items: center;
`;

export const ContainerButtons = styled.View`
    height: ${RFValue(500)}px;
    margin-top: ${RFValue(30)}px;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`;

export const DateButton = styled.TouchableOpacity`
    width: 90%;
    height: ${RFValue(130)}px;
    background-color: ${({ theme }) => theme.colors.bgContainerColorActive};
    border-width: ${RFValue(1)}px;
    border-color: ${({ theme }) => theme.colors.highlightColor};
    border-radius: ${RFValue(10)}px;
    padding: ${RFValue(10)}px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

export const DateButtonText = styled.Text`
    color: #ffffff85;
    font-size: ${RFValue(16)}px;
    font-weight: 500;
`;

export const DateButtonTitle = styled.Text`
    color: ${({ theme }) => theme.colors.highlightColor};
    font-size: ${RFValue(28)}px;
    font-weight: 600;
`;

export const ButtonAdd = styled.TouchableOpacity`
    border-width: ${RFValue(1)}px;
    border-color: ${({ theme }) => theme.colors.highlightColor};
    border-radius: ${RFValue(50)}px;
    width: ${RFValue(50)}px;
    height: ${RFValue(50)}px;
    justify-content: center;
    align-items: center;
    margin-left: auto;
`;