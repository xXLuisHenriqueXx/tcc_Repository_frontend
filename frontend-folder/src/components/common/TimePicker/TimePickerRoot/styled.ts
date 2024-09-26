import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
    width: 100%;
    height: ${RFValue(100)}px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-bottom-width: ${RFValue(2)}px;
    border-top-width: ${RFValue(2)}px;
    border-color: ${({ theme }) => theme.colors.bdColor};
`;