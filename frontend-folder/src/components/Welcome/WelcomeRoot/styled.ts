import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import Constants from 'expo-constants';
import { MotiView } from "moti";

const statusBarHeight = Constants.statusBarHeight;

export const Container = styled(MotiView)`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.bgColor};
`;

export const ContainerImage = styled.ImageBackground.attrs({
    resizeMode: "cover"
})`
    flex: 1;
`;

export const ContainerScrollView = styled.ScrollView`
    flex: 1;
    margin-top: ${statusBarHeight + RFValue(80)}px;
`;

export const ContainerView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 0 ${RFValue(16)}px;
`;