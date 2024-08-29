import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const ContainerView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.fadeBgColor};
    padding: 0 ${RFValue(16)}px;
`;

export const ModalView = styled.View`
    width: 100%;
    height: auto;
    background-color: ${({ theme }) => theme.colors.bgModal};
    align-items: center;
    padding: ${RFValue(16)}px;
    border: ${RFValue(1)}px solid ${({ theme }) => theme.colors.bdColor};
    border-radius: ${RFValue(5)}px;                      
`;

export const ModalTitle = styled.Text`
    font-size: ${RFValue(20)}px;
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
    margin-bottom: ${RFValue(8)}px;
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
    font-size: ${RFValue(16)}px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.bgModal};
`;