import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(50)}px;
    font-family: ${({ theme }) => theme.fonts.karantinaBold};
    text-transform: uppercase;
    margin-right: ${RFValue(8)}px;
`;

export const NormalText = styled.Text`
    margin-top: ${RFValue(2)}px;
    margin-bottom: ${RFValue(60)}px;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(14)}px;
`;

export const DiasText = styled(NormalText)`
    color: ${({ theme }) => theme.colors.highlightColor};
    font-weight: 600;
`;

