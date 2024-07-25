import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.ScrollView`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.bgColor};
`;

export const ContainerInputs = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const ContainerInputsView = styled.View`
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.bgContainerColorActive};
    border-top-left-radius: ${RFValue(30)}px;
    border-top-right-radius: ${RFValue(30)}px;
    padding: ${RFValue(10)}px;
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