import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const ContainerModeSelect = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
    flex-direction: row;
    align-items: center;
    margin-top: ${RFValue(60)}px;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(32)}px;
    font-weight: 900;
    text-transform: uppercase;
    margin-right: ${RFValue(8)}px;
`;

export const NormalText = styled.Text`
    margin-top: ${RFValue(2)}px;
    margin-bottom: ${RFValue(60)}px;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(14)}px;
`;

export const DiasText = styled(NormalText)`
    color: ${({ theme }) => theme.colors.highlightColor};
    font-weight: 600;
`;

