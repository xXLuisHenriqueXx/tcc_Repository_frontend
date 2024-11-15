import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const ModalTitle = styled.Text`
    font-size: ${RFValue(14)}px;
    text-transform: uppercase;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.highlightColor};
    text-align: center;
    margin-bottom: ${RFValue(16)}px;
`;

export const ModalText = styled.Text`
    font-size: ${RFValue(14)}px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.text};
    text-align: center;
`;

export const ContainerExperience = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: ${RFValue(8)}px 0;
`;

export const ModalButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
    width: 100%;
    height: ${RFValue(40)}px;
    background-color: ${({ theme }) => theme.colors.highlightColor};
    justify-content: center;
    align-items: center;
    border-radius: ${RFValue(5)}px;
    margin-top: ${RFValue(16)}px;
`;

export const ModalButtonText = styled.Text`
    font-size: ${RFValue(14)}px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.bgModal};
`;