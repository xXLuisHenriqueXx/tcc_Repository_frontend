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
    padding-top: ${RFValue(40)}px;
    z-index: 11;
`;

export const ContainerUser = styled.View`
    flex-direction: column;
    margin-bottom: ${RFValue(32)}px;
`;

export const UserImage = styled.View`
    width: ${RFValue(80)}px;
    aspect-ratio: 1;
    background-color: ${({ theme }) => theme.colors.bgContainerColorActive};
    border-radius: ${RFValue(50)}px;
    border: ${RFValue(2)}px solid ${({ theme }) => theme.colors.highlightColor};
`;

export const UserName = styled.Text`
    font-size: ${RFValue(12)}px;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
    margin-top: ${RFValue(4)}px;
    text-align: center;
`;

export const ContainerButtonGroup = styled.View`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.bgContainerColorInactive};
    border-radius: ${RFValue(5)}px;
    flex-direction: column;
    padding: ${RFValue(8)}px 0;
    margin-bottom: ${RFValue(16)}px;
`;

export const ContainerButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
    flex-direction: row;
    width: 100%;
    height: ${RFValue(40)}px;
    align-items: center;
    justify-content: center;
`;

export const ContainerButtonText = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
`;

export const ContainerButtonSeparator = styled.View`
    width: 92%;
    height: ${RFValue(1)}px;
    background-color: ${({ theme }) => theme.colors.textInactive};
    align-self: center;
    margin: ${RFValue(8)}px 0;
`;