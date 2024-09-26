import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const SeparatorText = styled.Text`
    color: ${({ theme }) => theme.colors.highlightColor};
    font-size: ${RFValue(30)}px;
    font-weight: 900;
    margin: 0 ${RFValue(10)}px;
`;