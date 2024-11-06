import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const ContainerControllers = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: ${RFValue(100)}px;
`;

export const ButtonPrevious = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
    width: ${RFValue(50)}px;
    height: ${RFValue(50)}px;
    border-radius: ${RFValue(25)}px;
    background-color: transparent;
    justify-content: center;
    align-items: center;
    border: ${RFValue(2)}px solid ${({ theme }) => theme.colors.highlightColor};
`;

export const ButtonNext = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
    width: ${RFValue(50)}px;
    height: ${RFValue(50)}px;
    border-radius: ${RFValue(25)}px;
    background-color: ${({ theme }) => theme.colors.highlightColor};
    justify-content: center;
    align-items: center;
`;

export const DotsContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex: 1;
`;

export const Dot = styled.View<{ active: boolean }>`
    width: ${({ active }) => (active ? RFValue(10) : RFValue(6))}px;
    height: ${({ active }) => (active ? RFValue(10) : RFValue(6))}px;
    border-radius: ${RFValue(5)}px;
    background-color: ${({ theme, active }) => (active ? theme.colors.highlightColor : theme.colors.textInactive)};
    margin: 0 ${RFValue(3)}px;
`;