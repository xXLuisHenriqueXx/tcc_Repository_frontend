import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const ContainerModal = styled.View`
    position: absolute;
    top: ${RFValue(-28)}px;
    right: 0;
    width: 50%;
    height: ${RFValue(36)}px;
    border-radius: ${RFValue(5)}px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 ${RFValue(16)}px;
    background-color: ${({ theme }) => theme.colors.highlightColor};
`;

export const IconButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
`;