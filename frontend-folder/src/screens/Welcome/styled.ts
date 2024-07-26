import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.ScrollView`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.bgColor};
`;

export const BackButton = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.highlightColor};
    border-radius: ${RFValue(50)}px;
    width: ${RFValue(50)}px;
    height: ${RFValue(50)}px;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: ${RFValue(10)}px;
    left: ${RFValue(10)}px;
`;

export const ContainerView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-top: ${RFValue(80)}px;
`;

export const Logo = styled.Image.attrs({
    resizeMode: 'contain'
})`
    width: ${RFValue(170)}px;
    height: ${RFValue(150)}px;
`;

export const ContainerText = styled.View`
    flex-direction: column;
    align-items: center;
    width: 90%;
    margin: ${RFValue(60)}px 0;
`;

export const Title = styled.Text`
    font-size: ${RFValue(30)}px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.highlightColor};
`;

export const NormalText = styled.Text`
    font-size: ${RFValue(18)}px;
    color: ${({ theme }) => theme.colors.text};
    text-align: center;
`;

export const ContainerButton = styled.View`
    flex-direction: column;
    align-items: center;
    width: 90%;
`;

export const LoginButton = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.highlightColor};
    width: 100%;
    height: ${RFValue(60)}px;
    border-radius: ${RFValue(10)}px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: ${RFValue(30)}px;
`;

export const LoginButtonText = styled.Text`
    font-size: ${RFValue(25)}px;
    color: ${({ theme }) => theme.colors.bgColor};
    font-weight: bold;
`;

export const RegisterButton = styled.TouchableOpacity`
    width: 100%;
    height: ${RFValue(60)}px;
    border-radius: ${RFValue(10)}px;
    border-width: ${RFValue(1)}px;
    border-color: ${({ theme }) => theme.colors.highlightColor};
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const RegisterButtonText = styled.Text`
    font-size: ${RFValue(25)}px;
    color: ${({ theme }) => theme.colors.highlightColor};
    font-weight: bold;
`;