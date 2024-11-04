import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Title = styled.Text`
    font-size: ${RFValue(32)}px;
    font-weight: 900;
    text-transform: uppercase;
    margin-top: ${RFValue(60)}px;
    color: ${({ theme }) => theme.colors.text};
`;

export const NormalText = styled.Text`
    margin-top: ${RFValue(2)}px;
    margin-bottom: ${RFValue(60)}px;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(14)}px;
`;

export const HighlightText = styled(NormalText)`
    color: ${({ theme }) => theme.colors.highlightColor};
    font-weight: 600;
`;