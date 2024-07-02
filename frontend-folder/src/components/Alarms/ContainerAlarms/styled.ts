import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

interface SwitchEnabledProps {
    switchEnabled: boolean;
}

export const ContainerAlarmView = styled.View<SwitchEnabledProps>`
    border-radius: ${RFValue(5)}px;
    width: 90%;
    height: ${RFValue(105)}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 ${RFValue(26)}px;
    margin-bottom: ${RFValue(20)}px;
    margin-left: auto;
    margin-right: auto;
    background-color: ${({ switchEnabled, theme }) => switchEnabled ? theme.colors.bgContainerColorActive : theme.colors.bgContainerColorInactive};
`;

export const TextMaterialAlarm = styled.Text<SwitchEnabledProps>`
    font-size: ${RFValue(14)}px;
    font-weight: bold;
    color: ${({ switchEnabled, theme }) => switchEnabled ? theme.colors.highlightColor : theme.colors.textInactive};
`;  

export const TextHorarioAlarm = styled.Text<SwitchEnabledProps>`
    font-size: ${RFValue(45)}px;
    font-weight: bold;
    margin-bottom: ${RFValue(-5)}px;
    margin-top: ${RFValue(-5)}px;
    color: ${({ switchEnabled, theme }) => switchEnabled ? theme.colors.text : theme.colors.textInactive};
`;

export const TextDiasAlarm = styled.Text<SwitchEnabledProps>`
    font-size: ${RFValue(12)}px;
    font-weight: normal;
    color: ${({ switchEnabled, theme }) => switchEnabled ? theme.colors.highlightColor : theme.colors.textInactive};
`;

export const DeleteButton = styled.TouchableOpacity`
    position: absolute;
    top: ${RFValue(10)}px;
    right: ${RFValue(10)}px;
`;

export const SwitchButton = styled.Switch`
    position: absolute;
    top: ${RFValue(40)}px;
    right: ${RFValue(30)}px;
`;