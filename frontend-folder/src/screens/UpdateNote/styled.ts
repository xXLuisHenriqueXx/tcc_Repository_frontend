import { MotiView } from "moti";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.ScrollView.attrs({
    contentContainerStyle: {
        flexGrow: 1
    }
})`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.bgColor};
`;

export const ContainerInputs = styled(MotiView)`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const ContainerInputsView = styled.View`
    width: 100%;
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.bgContainerColorActive};
    border-top-left-radius: ${RFValue(30)}px;
    border-top-right-radius: ${RFValue(30)}px;
    padding: 0 ${RFValue(16)}px;
`;

export const ContainerInputsTitle = styled.Text`
    width: 100%;
    font-size: ${RFValue(20)}px;
    color: ${({ theme }) => theme.colors.highlightColor};
    font-weight: bold;
    padding: ${RFValue(16)}px 0;
    text-align: center;
    border-bottom-width: ${RFValue(1)}px;
    border-bottom-color: ${({ theme }) => theme.colors.bdColor};
`;

export const InputContent = styled.TextInput`
    width: 100%;
    height: 100%;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(16)}px;
    margin-top: ${RFValue(16)}px;
`;