import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const InputTitleView = styled.View`
    width: 90%;
    height: ${RFValue(42)}px;
    border-bottom-width: ${RFValue(1)}px;
    border-color: ${({ theme }) => theme.colors.highlightColor};
    flex-direction: row;
    align-items: center;
`;

export const InputTitleTextInput = styled.TextInput`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(16)}px;
    padding: 0 ${RFValue(6)}px;
`;