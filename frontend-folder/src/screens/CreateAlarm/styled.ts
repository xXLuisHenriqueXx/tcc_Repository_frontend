import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface selectedProp {
    selected: boolean;
}

export const Container = styled.ScrollView`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.bgColor};
`;

export const ContainerButtons = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin: 0 ${RFValue(16)}px;
`;

export const ContainerButtonsView = styled.View`
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.bgContainerColorActive};
    border-radius: ${RFValue(10)}px;
    padding: ${RFValue(40)}px 0;
`;

export const DateButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
    width: 90%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-bottom: ${RFValue(40)}px;
    border-bottom-width: ${RFValue(1)}px;
    border-bottom-color: ${({ theme }) => theme.colors.bdColor};
`;

export const DateButtonText = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(60)}px;
    margin-right: ${RFValue(10)}px;
    font-weight: bold;
`;



export const ContainerDaysView = styled.View`
    width: 90%;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: ${RFValue(40)}px;
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
    width: ${RFValue(35)}px;
    height: ${RFValue(35)}px;
    background-color: ${({ theme, selected }) => selected ? theme.colors.highlightColor : theme.colors.highlightColorInactive};
    justify-content: center;
    align-items: center;
    border-radius: ${RFValue(50)}px;
`;

export const DayButtonText = styled.Text`
    color: ${({ theme }) => theme.colors.bgColor};
    font-size: ${RFValue(16)}px;
    font-weight: bold;
`;