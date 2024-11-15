import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { MotiView } from "moti";

export const ContainerModal = styled(MotiView)`
    position: absolute;
    top: ${RFValue(-60)}px;
    right: ${RFValue(16)}px;
    width: ${RFValue(140)}px;
    height: ${RFValue(80)}px;
    border-radius: ${RFValue(5)}px;
    flex-direction: column;
    justify-content: center;
    padding: 0 ${RFValue(8)}px;
    background-color: ${({ theme }) => theme.colors.bgContainerColorActive};
`;

export const ButtonContainer = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
    flex-direction: row;
    gap: ${RFValue(8)}px;
`;

export const ButtonContainerText = styled.Text`
    font-size: ${RFValue(14)}px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.text};
`;

export const ButtonContainerSeparator = styled.View`
    width: 100%;
    height: ${RFValue(1)}px;
    background-color: ${({ theme }) => theme.colors.textInactive};
    margin: ${RFValue(8)}px 0;
`;