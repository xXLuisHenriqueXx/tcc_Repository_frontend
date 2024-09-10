import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const ContainerModeSelect = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
    flex-direction: row;
    align-items: center;
    margin-top: ${RFValue(60)}px;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(40)}px;
    font-weight: bold;
    margin-right: ${RFValue(8)}px;
`;

export const NormalText = styled.Text`
    margin-top: ${RFValue(2)}px;
    margin-bottom: ${RFValue(60)}px;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(14)}px;
`;

export const DiasText = styled(NormalText)`
    color: ${({ theme }) => theme.colors.highlightColor};
    font-weight: bold;
`;

export const ContainerPomodoro = styled.ScrollView.attrs({
    contentContainerStyle: {
        flexGrow: 1
    }
})`
    padding: 0 ${RFValue(16)}px;
`;

export const ContainerPomodoroTitle = styled.View`
`;

export const ContainerPomodoroButtons = styled.View`
    width: 100%;
    flex-direction: column;
    align-items: center;
    border-top-width: ${RFValue(2)}px;
    border-color: ${({ theme }) => theme.colors.bdColor};
    padding-top: ${RFValue(16)}px;
`;

export const ContainerPomodoroButtonsTitle = styled.Text`
    width: 100%;
    text-align: start;
    font-size: ${RFValue(16)}px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
`;

export const ContainerPomodoroButtonsTimeBox = styled.View`
    width: 60%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: ${RFValue(8)}px;
`;

export const ContainerPomodoroButtonsTimeBoxInput = styled.TextInput`
    font-size: ${RFValue(80)}px;
    color: ${({ theme }) => theme.colors.text};
`;

export const ContainerPomodoroButtonsTimeBoxInputText = styled.Text`
    font-size: ${RFValue(24)}px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.highlightColor};
    margin-left: ${RFValue(8)}px;
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
    margin-top: ${RFValue(30)}px;
`;

export const ContainerPomodoroButtonsStartButtonText = styled.Text`
    font-size: ${RFValue(16)}px;
    color: ${({ theme }) => theme.colors.bgColor};
    font-weight: 600;
`;