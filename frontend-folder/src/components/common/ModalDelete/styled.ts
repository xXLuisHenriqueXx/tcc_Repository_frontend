import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const ContainerView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.fadeBgColor};
`;

export const ModalView = styled.View`
    width: 90%;
    height: ${RFValue(180)}px;
    background-color: ${({ theme }) => theme.colors.bgModal};
    align-items: center;
    padding-top: ${RFValue(20)}px;
    border-radius: ${RFValue(10)}px;                      
`;

export const ModalTitle = styled.Text`
    font-size: ${RFValue(15)}px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
    padding-bottom: ${RFValue(12)}px;
    border-bottom-width: ${RFValue(1)}px;
    border-bottom-color: ${({ theme }) => theme.colors.bdColor};
`;

export const ModalTitleDestaque = styled.Text`
    color: ${({ theme }) => theme.colors.highlightColor};
`;

export const ContainerButtons = styled.View`
    flex: 1;
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

export const NoButton = styled.TouchableOpacity`
    border-width: ${RFValue(1)}px;
    border-color: ${({ theme }) => theme.colors.highlightColor};
    border-radius: ${RFValue(10)}px;
    width: ${RFValue(100)}px;
    height: ${RFValue(40)}px;
    justify-content: center;
    align-items: center;
`;

export const YesButton = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.highlightColor};
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.highlightColor};
    border-radius: ${RFValue(10)}px;
    width: ${RFValue(100)}px;
    height: ${RFValue(40)}px;
    justify-content: center;
    align-items: center;
`;

export const NoButtonText = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(15)}px;
    font-weight: bold;
`;

export const YesButtonText = styled.Text`
    color: ${({ theme }) => theme.colors.bgColor};
    font-size: ${RFValue(15)}px;
    font-weight: bold;
`;