import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    position: absolute;
    width: 100%;
    height: ${RFValue(60)}px;
    background-color: ${({ theme }) => theme.colors.bgBottomTab};
    border-top-left-radius: ${RFValue(20)}px;
    border-top-right-radius: ${RFValue(20)}px;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    bottom: 0;
`;

export const IconButton = styled.TouchableOpacity`
    width: ${RFValue(60)}px;
    height: ${RFValue(60)}px;
    align-items: center;
    justify-content: center;
`;