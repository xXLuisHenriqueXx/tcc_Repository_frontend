import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.bgColor};
`;

export const ContainerHeader = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    padding: ${RFValue(10)}px;
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

export const ContainerInputs = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const ContainerInputsView = styled.View`
    width: 95%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.bgContainerColorActive};
    border-radius: ${RFValue(10)}px;
    padding: ${RFValue(40)}px 0;
`;

export const InputTitleContainer = styled.View`
    width: 90%;
    flex-direction: column;
    justify-content: flex-start;
`;

export const InputTitle = styled.Text`
    font-size: ${RFValue(20)}px;
    color: ${({ theme }) => theme.colors.highlightColor};
    font-weight: bold;
    margin-bottom: ${RFValue(5)}px;
`;

export const Input = styled.TextInput`
    width: 100%;
    height: ${RFValue(30)}px;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(16)}px;
    border-bottom-width: ${RFValue(1)}px;
    border-bottom-color: ${({ theme }) => theme.colors.highlightColor};
`;

export const InputContent = styled.TextInput`
    width: 90%;
    height: ${RFValue(380)}px;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(16)}px;
    border: ${RFValue(1)}px solid ${({ theme }) => theme.colors.highlightColor};
    border-radius: ${RFValue(5)}px;
    margin-top: ${RFValue(30)}px;
`;