import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const ContainerButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
    position: absolute;
    bottom: ${RFValue(80)}px;
    right: ${RFValue(10)}px;
    z-index: 9;
`;

export const BgButton = styled.ImageBackground.attrs({
    resizeMode: 'contain'
})`
    width: ${RFValue(50)}px;
    height: ${RFValue(50)}px;
    justify-content: center;
    align-items: center;
`;