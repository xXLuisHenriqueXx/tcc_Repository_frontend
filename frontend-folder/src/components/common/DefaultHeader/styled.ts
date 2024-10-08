import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const ContainerHeader = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: ${RFValue(10)}px ${RFValue(16)}px;
`;

export const Input = styled.TextInput`
    flex: 1;
    height: ${RFValue(30)}px;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(14)}px;
    text-align: center;
`;

export const ButtonAdd = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
    border: ${RFValue(2)}px solid ${({ theme }) => theme.colors.highlightColor};
    border-radius: ${RFValue(20)}px;
    width: ${RFValue(40)}px;
    height: ${RFValue(40)}px;
    justify-content: center;
    align-items: center;
    margin-left: ${RFValue(5)}px;
`;

export const BackButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
    background-color: ${({ theme }) => theme.colors.highlightColor};
    border-radius: ${RFValue(20)}px;
    width: ${RFValue(40)}px;
    height: ${RFValue(40)}px;
    justify-content: center;
    align-items: center;
    margin-right: ${RFValue(5)}px;
`;