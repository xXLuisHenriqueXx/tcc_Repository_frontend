import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import Constants from 'expo-constants';
import { MotiView } from "moti";

const statusBarHeight = Constants.statusBarHeight;

export const Container = styled.View`
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

export const ContainerPomodoro = styled(MotiView)`
    flex: 1;
    margin-top: ${statusBarHeight + RFValue(140)}px;
    padding: 0 ${RFValue(16)}px;
`;

export const TimerContainer = styled.View`
    flex-direction: column;
    width: 100%;
`;

export const TimerTitle = styled.Text`
    font-size: ${RFValue(20)}px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textInactive};
    text-align: center;
`;

export const TimerText = styled.Text`
    font-size: ${RFValue(80)}px;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 700;
    text-align: center;
    margin: ${RFValue(16)}px 0;
`;

export const TimerTextSmall = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.textInactive};
    text-align: center;
`;

export const TimerButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
    position: absolute;
    bottom: ${RFValue(80)}px;
    right: ${RFValue(16)}px;
    width: 100%;
    height: ${RFValue(50)}px;
    background-color: ${({ theme }) => theme.colors.highlightColor};
    border-radius: ${RFValue(5)}px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const TimerButtonText = styled.Text`
    font-size: ${RFValue(16)}px;
    color: ${({ theme }) => theme.colors.bgColor};
    font-weight: 600;
`;