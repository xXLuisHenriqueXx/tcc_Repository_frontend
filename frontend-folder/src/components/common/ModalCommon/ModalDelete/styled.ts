import styled from 'styled-components/native'; 
import { RFValue } from 'react-native-responsive-fontsize';

export const ModalTitle = styled.Text`
    font-size: ${RFValue(14)}px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.text};
    text-align: center;
    margin-bottom: ${RFValue(16)}px;
`;

export const ModalTitleDestaque = styled.Text`
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

export const NoButton = styled.TouchableOpacity.attrs({
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

export const YesButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
    background-color: ${({ theme }) => theme.colors.highlightColor};
    border-radius: ${RFValue(5)}px;
    width: 100%;
    height: ${RFValue(50)}px;
    justify-content: center;
    align-items: center;
`;

export const NoButtonText = styled.Text`
    color: ${({ theme }) => theme.colors.highlightColor};
    font-size: ${RFValue(14)}px;
    font-weight: 600;
    text-transform: uppercase;
`;

export const YesButtonText = styled(NoButtonText)`
    color: ${({ theme }) => theme.colors.bgColor};
`;