import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { MotiView } from "moti";

export const ContainerView = styled(MotiView)`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.fadeBgColor};
    padding: 0 ${RFValue(16)}px;
`; 
export const ModalTouchable = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 90;
`;