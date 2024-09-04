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
    width:100%;
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

export const RegisterButton = styled.TouchableOpacity.attrs({
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

export const RegisterButtonText = styled.Text`
    font-size: ${RFValue(16)}px;
    color: ${({ theme }) => theme.colors.bgColor};
    font-weight: 600;
`;