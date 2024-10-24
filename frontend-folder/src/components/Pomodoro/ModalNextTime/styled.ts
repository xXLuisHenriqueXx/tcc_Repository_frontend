import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { MotiView } from "moti";

export const ContainerView = styled(MotiView)`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.fadeBgColor};
    padding: 0 ${RFValue(16)}px;
`;

export const ModalView = styled.View`
    width: 100%;
    height: ${RFValue(200)}px;
    background-color: ${({ theme }) => theme.colors.bgModal};
    align-items: center;
    padding: ${RFValue(16)}px;
    border: ${RFValue(1)}px solid ${({ theme }) => theme.colors.bdColor};
    border-radius: ${RFValue(5)}px;                      
`;

export const ModalTitle = styled.Text`
    font-size: ${RFValue(14)}px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.text};
    text-align: center;
    margin-bottom: ${RFValue(16)}px;
`;

export const ModalTitleHighlight = styled.Text`
    font-weight: 600;
    color: ${({ theme }) => theme.colors.highlightColor};
`;

export const ContainerButtons = styled.View`
    flex: 1;
    width: 100%;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`;

export const FinishButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
    border-width: ${RFValue(2)}px;
    border-color: ${({ theme }) => theme.colors.highlightColor};
    border-radius: ${RFValue(5)}px;
    width: 100%;
    height: ${RFValue(50)}px;
    justify-content: center;
    align-items: center;
`;

export const ContinueButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
    background-color: ${({ theme }) => theme.colors.highlightColor};
    border-radius: ${RFValue(5)}px;
    width: 100%;
    height: ${RFValue(50)}px;
    justify-content: center;
    align-items: center;
`;

export const FinishButtonText = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(14)}px;
    font-weight: 600;
    text-transform: uppercase;
`;

export const ContinueButtonText = styled(FinishButtonText)`
    color: ${({ theme }) => theme.colors.bgColor};
`;