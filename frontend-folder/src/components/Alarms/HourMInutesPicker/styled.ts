import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
`;

export const ContainerRender = styled.TouchableOpacity`
    height: ${RFValue(80)}px;
    justify-content: center;
    align-items: center;
`;

export const ContainerRenderText = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(50)}px;
    font-weight: 700;
`;

export const SeparatorText = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(30)}px;
    margin: 0 ${RFValue(10)}px;
`;