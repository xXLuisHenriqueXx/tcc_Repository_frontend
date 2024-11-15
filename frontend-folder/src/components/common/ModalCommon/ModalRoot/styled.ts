import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { MotiView } from "moti";

export const ContainerView = styled(MotiView)`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.fadeBgColor};
    padding: 0 ${RFValue(16)}px;
    z-index: 98;
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