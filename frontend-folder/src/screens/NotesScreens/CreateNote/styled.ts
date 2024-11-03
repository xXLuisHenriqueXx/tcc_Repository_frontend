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

export const ContainerInputLine = styled.View`
    width: ${RFValue(140)}px;
    height: ${RFValue(6)}px;
    border-radius: ${RFValue(3)}px;
    background-color: ${({ theme }) => theme.colors.bgColor};
    margin: ${RFValue(20)}px 0;
`;

export const InputContent = styled.TextInput`
    width: 100%;
    height: 100%;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(16)}px;
    margin-top: ${RFValue(16)}px;
`;