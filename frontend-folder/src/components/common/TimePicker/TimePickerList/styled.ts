import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

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