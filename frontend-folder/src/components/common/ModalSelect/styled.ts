import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { MotiView } from "moti";

interface screenSelected {
    selected: string;
}

export const ContainerView = styled(MotiView)`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.fadeBgColor};
    padding: 0 ${RFValue(16)}px;
`;

export const ModalView = styled.View`
    width: 100%;
    height: ${RFValue(200)}px;
    background-color: ${({ theme }) => theme.colors.bgModal};
    align-items: center;
    padding: ${RFValue(16)}px;
    border: ${RFValue(1)}px solid ${({ theme }) => theme.colors.bdColor};
    border-radius: ${RFValue(5)}px;                      
`;

export const ModalTitle = styled.Text`
    font-size: ${RFValue(14)}px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
    text-align: center;
    margin-bottom: ${RFValue(16)}px;
`;

export const ContainerButtons = styled.View`
    flex: 1;
    width: 100%;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`;

export const AlarmButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})<screenSelected>`
    border-width: ${RFValue(2)}px;
    border-color: ${({ theme }) => theme.colors.highlightColor};
    border-radius: ${RFValue(5)}px;
    background-color: ${({ selected, theme }) => selected === "alarm" ? theme.colors.highlightColor : theme.colors.bgContainerColorInactive };
    width: 100%;
    height: ${RFValue(50)}px;
    justify-content: center;
    align-items: center;
`;

export const AlarmButtonText = styled.Text<screenSelected>`
    color: ${({ selected, theme }) => selected === "alarm" ? theme.colors.bgColor : theme.colors.text};
    font-size: ${RFValue(14)}px;
    font-weight: 600;
    text-transform: uppercase;
`;

export const PomodoroButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})<screenSelected>`
    border-width: ${RFValue(2)}px;
    border-color: ${({ theme }) => theme.colors.highlightColor};
    border-radius: ${RFValue(5)}px;
    background-color: ${({ selected, theme }) => selected === "pomodoro" ? theme.colors.highlightColor : theme.colors.bgContainerColorInactive };
    width: 100%;
    height: ${RFValue(50)}px;
    justify-content: center;
    align-items: center;
`;

export const PomodoroButtonText = styled.Text<screenSelected>`
    color: ${({ selected, theme }) => selected === "pomodoro" ? theme.colors.bgColor : theme.colors.text};
    font-size: ${RFValue(14)}px;
    font-weight: 600;
    text-transform: uppercase;
`;