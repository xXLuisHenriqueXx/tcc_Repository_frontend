import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { MotiView } from "moti";

export const ContainerScreen = styled(MotiView)`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.fadeBgColor};
    z-index: 10;
`;

export const ContainerSide = styled(MotiView)`
    width: 80%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.bgColor};
    align-items: center;
    padding: 0 ${RFValue(16)}px;
    padding-top: ${RFValue(60)}px;
    z-index: 11;
`;

export const ContainerButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
    width: 100%;
    height: ${RFValue(60)}px;
    border-radius: ${RFValue(5)}px;
    background-color: ${({ theme }) => theme.colors.bgContainerColorActive};
    align-items: center;
    justify-content: center;
    margin-bottom: ${RFValue(16)}px;
`;