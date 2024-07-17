import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.ImageBackground`
    flex: 1;
    background-size: cover;
`;

export const Title = styled.Text`
    margin-top: ${RFValue(25)}px;
    margin-left: ${RFValue(17)}px;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(40)}px;
    font-weight: bold;
`;

export const NormalText = styled.Text`
    margin-top: ${RFValue(2)}px;
    margin-left: ${RFValue(17)}px;
    margin-bottom: ${RFValue(32)}px;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(15)}px;
`;