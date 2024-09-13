import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";


export const Container = styled(LinearGradient)`
    flex: 1;
`;

export const ConfigButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
    position: absolute;
    top: ${RFValue(16)}px;
    left: ${RFValue(16)}px;
    z-index: 1;
`;