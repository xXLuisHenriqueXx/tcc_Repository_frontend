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
    margin-top: ${statusBarHeight + RFValue(80)}px;
    padding: 0 ${RFValue(16)}px;
`;

export const TimerContainer = styled.View`
    flex-direction: column;
    width: 100%;
`;

export const TimerTitle = styled.Text`
    font-size: ${RFValue(12)}px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textInactive};
    text-align: start;
`;

export const TimerText = styled.Text`
    font-size: ${RFValue(80)}px;
    color: ${({ theme }) => theme.colors.text};
    text-align: center;
`;