import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import Constants from 'expo-constants';
import { MotiView } from "moti";

const statusBarHeight = Constants.statusBarHeight;

export const Container = styled.ScrollView`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.bgColor};
`;

export const BackButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
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

export const ContainerText = styled.View`
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: ${RFValue(80)}px;
    padding: 0 ${RFValue(16)}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(30)}px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.highlightColor};
    text-align: center;
`;

export const NormalText = styled.Text`
    font-size: ${RFValue(16)}px;
    color: ${({ theme }) => theme.colors.text};
    text-align: center;
`;

export const ContainerForm = styled(MotiView)`
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding: 0 ${RFValue(16)}px;
`;

export const InputContainer = styled.View`
    width: 100%;
    height: ${RFValue(30)}px;
    flex-direction: row;
    align-items: center;
    border-bottom-width: ${RFValue(2)}px;
    border-bottom-color: ${({ theme }) => theme.colors.highlightColor};
    margin-bottom: ${RFValue(30)}px;
`;

export const Input = styled.TextInput`
    flex: 1;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(16)}px;
    margin-left: ${RFValue(5)}px;
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

export const ForgotPasswordButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
`;

export const ForgotPasswordText = styled.Text`
    font-size: ${RFValue(12)}px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
    margin-top: ${RFValue(8)}px;
`;

export const OrContainer = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin: ${RFValue(32)}px 0;
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

export const GoogleButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
    width: 100%;
    height: ${RFValue(50)}px;
    border-radius: ${RFValue(5)}px;
    border-width: ${RFValue(2)}px;
    border-color: ${({ theme }) => theme.colors.highlightColor};
    background-color: ${({ theme }) => theme.colors.bgContainerColorActive};
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const GoogleButtonText = styled.Text`
    font-size: ${RFValue(16)}px;
    color: ${({ theme }) => theme.colors.highlightColor};
    font-weight: 600;
`;