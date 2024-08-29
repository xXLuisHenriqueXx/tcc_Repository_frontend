import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface screenEnabledProps {
    screenEnabled: boolean;
}

export const Container = styled.View`
    position: absolute;
    width: 100%;
    height: ${RFValue(70)}px;
    background-color: ${({ theme }) => theme.colors.bgBottomTab};
    border-top-left-radius: ${RFValue(20)}px;
    border-top-right-radius: ${RFValue(20)}px;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    bottom: 0;
`;

export const IconButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
    width: ${RFValue(60)}px;
    height: ${RFValue(60)}px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const ButtonText = styled.Text<screenEnabledProps>`
    font-size: ${RFValue(8)}px;
    color: ${({ screenEnabled, theme }) => screenEnabled ? theme.colors.tintActiveColor : theme.colors.tintInactiveColor};
`;