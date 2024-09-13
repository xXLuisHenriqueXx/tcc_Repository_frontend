import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface selectedProp {
    selected: boolean;
}

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.bgColor};
`;

export const ContainerButtons = styled.View`
    width: 100%;
    height: 90%;
    justify-content: center;
    align-items: center;
    padding: 0 ${RFValue(16)}px;
`;

export const ContainerButtonsView = styled.View`
    width: 100%;
    height: ${RFValue(400)}px;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.bgContainerColorActive};
    border-radius: ${RFValue(10)}px;
    padding: ${RFValue(32)}px ${RFValue(16)}px;
`;

export const DateButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
    position: absolute;
    top: ${RFValue(32)}px;
    right: ${RFValue(16)}px;
`;

export const ContainerText = styled.Text`
    width: 100%;
    font-size: ${RFValue(14)}px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.text};
    text-align: start;
    margin-bottom: ${RFValue(16)}px;
`;

export const ContainerDaysView = styled.View`
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: ${RFValue(32)}px;
    padding-bottom: ${RFValue(32)}px;
    margin-bottom: ${RFValue(32)}px;
    border-bottom-width: ${RFValue(2)}px;
    border-color: ${({ theme }) => theme.colors.bdColor};
`;

export const ContainerDays = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

export const DayButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})<selectedProp>`
    width: ${RFValue(30)}px;
    height: ${RFValue(30)}px;
    background-color: ${({ theme, selected }) => selected ? theme.colors.highlightColor : "transparent"};
    justify-content: center;
    align-items: center;
    border-radius: ${RFValue(50)}px;
`;

export const DayButtonText = styled.Text<selectedProp>`
    color: ${({ theme, selected }) => selected ? theme.colors.bgColor : theme.colors.highlightColor};
    font-size: ${RFValue(16)}px;
    font-weight: bold;
`;