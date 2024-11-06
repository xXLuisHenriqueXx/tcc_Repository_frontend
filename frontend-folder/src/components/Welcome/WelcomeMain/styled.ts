import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Logo = styled.Image.attrs({
    resizeMode: 'contain'
})`
    width: ${RFValue(100)}px;
    height: ${RFValue(80)}px;
`;

export const ContainerText = styled.View`
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: ${RFValue(40)}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(60)}px;
    font-family: ${({ theme }) => theme.fonts.karantinaBold};
    color: ${({ theme }) => theme.colors.highlightColor};
`;

export const NormalText = styled.Text`
    font-size: ${RFValue(16)}px;
    color: ${({ theme }) => theme.colors.text};
    text-align: center;
`;