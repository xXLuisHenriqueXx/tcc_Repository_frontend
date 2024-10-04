import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const DateButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
    position: absolute;
    top: ${RFValue(32)}px;
    right: ${RFValue(16)}px;
`;