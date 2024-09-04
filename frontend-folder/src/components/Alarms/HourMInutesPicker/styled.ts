import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
    width: 100%;
    height: ${RFValue(100)}px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-bottom-width: ${RFValue(2)}px;
    border-top-width: ${RFValue(2)}px;
    border-color: ${({ theme }) => theme.colors.bdColor};
`;

export const ContainerRender = styled.TouchableOpacity`
    height: ${RFValue(100)}px;
    justify-content: center;
    align-items: center;
`;

export const ContainerRenderText = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(54)}px;
    font-weight: 700;
`;

export const SeparatorText = styled.Text`
    color: ${({ theme }) => theme.colors.highlightColor};
    font-size: ${RFValue(30)}px;
    font-weight: 900;
    margin: 0 ${RFValue(10)}px;
`;