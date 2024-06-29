import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const ContainerButton = styled.View`
    position: absolute;
    bottom: ${RFValue(80)}px;
    right: ${RFValue(10)}px;
    z-index: 99;
`;

export const BgButton = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.highlightColor};
    border-radius: ${RFValue(50)}px;
    width: ${RFValue(50)}px;
    height: ${RFValue(50)}px;;
    justify-content: center;
    align-items: center;
`;