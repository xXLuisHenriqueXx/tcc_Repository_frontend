import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const ContainerHeader = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: ${RFValue(10)}px;
    margin-bottom: ${RFValue(100)}px;
`;

export const Input = styled.TextInput`
    flex: 1;
    height: ${RFValue(30)}px;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(16)}px;
    text-align: center;
`;

export const ButtonAdd = styled.TouchableOpacity`
    border: ${RFValue(1)}px solid ${({ theme }) => theme.colors.highlightColor};
    border-radius: ${RFValue(50)}px;
    width: ${RFValue(45)}px;
    height: ${RFValue(45)}px;
    justify-content: center;
    align-items: center;
    margin-left: ${RFValue(5)}px;
`;

export const BackButton = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.highlightColor};
    border-radius: ${RFValue(50)}px;
    width: ${RFValue(45)}px;
    height: ${RFValue(45)}px;
    justify-content: center;
    align-items: center;
    margin-right: ${RFValue(5)}px;
`;