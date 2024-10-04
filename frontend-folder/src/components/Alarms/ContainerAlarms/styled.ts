import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

interface SwitchEnabledProps {
    switchEnabled: boolean;
}

export const ContainerAlarmView = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
}) <SwitchEnabledProps>`
    border-radius: ${RFValue(5)}px;
    width: 90%;
    height: ${RFValue(90)}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-self: center;
    padding: 0 ${RFValue(16)}px;
    margin-bottom: ${RFValue(16)}px;
    background-color: ${({ switchEnabled, theme }) => switchEnabled ? theme.colors.bgContainerColorActive : theme.colors.bgContainerColorInactive};
`;

export const TextMaterialAlarm = styled.Text<SwitchEnabledProps>`
    font-size: ${RFValue(12)}px;
    font-weight: 500;
    color: ${({ switchEnabled, theme }) => switchEnabled ? theme.colors.highlightColor : theme.colors.textInactive};
`;

export const TextHorarioAlarm = styled.Text<SwitchEnabledProps>`
    font-size: ${RFValue(32)}px;
    font-weight: 700;
    margin-bottom: ${RFValue(-5)}px;
    margin-top: ${RFValue(-5)}px;
    color: ${({ switchEnabled, theme }) => switchEnabled ? theme.colors.text : theme.colors.textInactive};
`;

export const TextDiasAlarmView = styled.View`
    flex-direction: row;
`;

export const TextDiasAlarm = styled.Text<SwitchEnabledProps>`
    font-size: ${RFValue(10)}px;
    font-weight: 300;
    color: ${({ switchEnabled, theme }) => switchEnabled ? theme.colors.highlightColor : theme.colors.textInactive};
    margin-right: ${RFValue(5)}px;
`;

export const TextDiasAlarmHighlight = styled(TextDiasAlarm)`
    font-weight: bold;
`;

export const SwitchButton = styled.Switch`
`;

export const TextDateAlarm = styled.Text<SwitchEnabledProps>`
    font-size: ${RFValue(10)}px;
    font-weight: 500;
    color: ${({ switchEnabled, theme }) => switchEnabled ? theme.colors.highlightColor : theme.colors.textInactive};
`;