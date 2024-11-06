import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const ContainerText = styled.View`
    width: 100%;
    flex-direction: column;
    align-items: center;
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

export const ContainerButton = styled.View`
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0 ${RFValue(16)}px;
    margin-top: ${RFValue(80)}px;
`;

export const LoginButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
    background-color: ${({ theme }) => theme.colors.highlightColor};
    width: 100%;
    height: ${RFValue(50)}px;
    border-radius: ${RFValue(5)}px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const LoginButtonText = styled.Text`
    font-size: ${RFValue(16)}px;
    color: ${({ theme }) => theme.colors.bgColor};
    font-weight: 600;
`;

export const OrContainer = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin: ${RFValue(16)}px 0;
`;

export const OrLine = styled.View`
    flex: 1;
    height: ${RFValue(2)}px;
    background-color: ${({ theme }) => theme.colors.bgContainerColorActive};
`;

export const OrText = styled.Text`
    font-size: ${RFValue(16)}px;
    color: ${({ theme }) => theme.colors.bgContainerColorActive};
    margin: 0 ${RFValue(16)}px;
`;

export const RegisterButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
    width: 100%;
    height: ${RFValue(50)}px;
    border-radius: ${RFValue(5)}px;
    border-width: ${RFValue(2)}px;
    border-color: ${({ theme }) => theme.colors.highlightColor};
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const RegisterButtonText = styled.Text`
    font-size: ${RFValue(16)}px;
    color: ${({ theme }) => theme.colors.highlightColor};
    font-weight: 600;
`;