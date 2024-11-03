import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const ContainerPomodoro = styled.View`
    flex: 1;
    padding: 0 ${RFValue(16)}px;
    margin-top: ${RFValue(60)}px;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.karantinaBold};
    font-size: ${RFValue(50)}px;
    text-transform: uppercase;
    margin-bottom: ${RFValue(60)}px;
`;

export const ContainerPomodoroButtons = styled.View`
    width: 100%;
    flex-direction: column;
    align-items: center;
`;

export const ContainerPomodoroButtonsTitle = styled.Text`
    width: 100%;
    text-align: start;
    font-size: ${RFValue(12)}px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${RFValue(8)}px;
`;

export const ContainerPomodoroButtonsTimeBox = styled.View`
    width: 100%;
    height: ${RFValue(100)}px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 ${RFValue(16)}px;
    border-bottom-width: ${RFValue(2)}px;
    border-top-width: ${RFValue(2)}px;
    border-color: ${({ theme }) => theme.colors.bdColor};
`;

export const ContainerPomodoroButtonsTimeBoxText = styled.Text`
    font-size: ${RFValue(54)}px;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 700;
`;

export const SeparatorText = styled.Text`
    color: ${({ theme }) => theme.colors.highlightColor};
    font-size: ${RFValue(30)}px;
    font-weight: 900;
    margin: 0 ${RFValue(10)}px;
`;

export const ContainerPomodoroButtonsStartButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
    width: 100%;
    height: ${RFValue(50)}px;
    background-color: ${({ theme }) => theme.colors.highlightColor};
    border-radius: ${RFValue(5)}px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: ${RFValue(40)}px;
`;

export const ContainerPomodoroButtonsStartButtonText = styled.Text`
    font-size: ${RFValue(16)}px;
    color: ${({ theme }) => theme.colors.bgColor};
    font-weight: 600;
`;