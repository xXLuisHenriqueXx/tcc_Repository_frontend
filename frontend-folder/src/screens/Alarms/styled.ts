import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Title = styled.Text`
    margin-top: ${RFValue(60)}px;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(40)}px;
    font-weight: bold;
`;

export const NormalText = styled.Text`
    margin-top: ${RFValue(2)}px;
    margin-bottom: ${RFValue(60)}px;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(14)}px;
`;

export const DiasText = styled.Text`
    color: ${({ theme }) => theme.colors.highlightColor};
    font-size: ${RFValue(16)}px;
    font-weight: bold;
`;