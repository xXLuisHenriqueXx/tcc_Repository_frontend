import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import Constants from 'expo-constants';

const statusBarHeight = Constants.statusBarHeight;

export const Container = styled.ScrollView`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.bgColor};
`;

export const BackButton = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.highlightColor};
    border-radius: ${RFValue(20)}px;
    width: ${RFValue(40)}px;
    height: ${RFValue(40)}px;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: ${RFValue(16)}px;
    left: ${RFValue(16)}px;
`;

export const ContainerView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-top: ${statusBarHeight + RFValue(80)}px;
`;

export const Logo = styled.Image.attrs({
    resizeMode: 'contain'
})`
    width: ${RFValue(150)}px;
    height: ${RFValue(130)}px;
`;

export const ContainerText = styled.View`
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: ${RFValue(60)}px 0;
    padding: 0 ${RFValue(16)}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(30)}px;
    font-weight: bold;
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
`;

export const LoginButton = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.highlightColor};
    width: 100%;
    height: ${RFValue(60)}px;
    border-radius: ${RFValue(5)}px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: ${RFValue(30)}px;
`;

export const LoginButtonText = styled.Text`
    font-size: ${RFValue(20)}px;
    color: ${({ theme }) => theme.colors.bgColor};
    font-weight: 600;
`;

export const RegisterButton = styled.TouchableOpacity`
    width: 100%;
    height: ${RFValue(60)}px;
    border-radius: ${RFValue(5)}px;
    border-width: ${RFValue(2)}px;
    border-color: ${({ theme }) => theme.colors.highlightColor};
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const RegisterButtonText = styled.Text`
    font-size: ${RFValue(20)}px;
    color: ${({ theme }) => theme.colors.highlightColor};
    font-weight: 600;
`;