import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.bgColor};
    align-items: center;
    padding: 0 ${RFValue(16)}px;
    padding-top: ${RFValue(60)}px;
`;

export const BackButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
    background-color: ${({ theme }) => theme.colors.highlightColor};
    border-radius: ${RFValue(20)}px;
    width: ${RFValue(40)}px;
    height: ${RFValue(40)}px;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: ${RFValue(16)}px;
    left: ${RFValue(16)}px;
    z-index: 2;
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