import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const ContainerText = styled.View`
    width: 100%;
    flex-direction: column;
    align-items: center;
    margin-top: ${RFValue(80)}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(60)}px;
    font-family: ${({ theme }) => theme.fonts.karantinaBold};
    color: ${({ theme }) => theme.colors.highlightColor};
`;

export const NormalText = styled.Text`
    font-size: ${RFValue(16)}px;
    color: ${({ theme }) => theme.colors.text};
    text-align: center;
`;

export const ContainerFeatures = styled.View`
    width: 100%;
    flex-direction: column;
    align-items: center;
    margin-top: ${RFValue(40)}px;
`;

export const FeatureTitle = styled.Text`
    font-size: ${RFValue(30)}px;
    font-family: ${({ theme }) => theme.fonts.karantinaBold};
    color: ${({ theme }) => theme.colors.highlightColor};
`;

export const FeatureText = styled.Text`
    font-size: ${RFValue(16)}px;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
    text-align: center;
    margin-top: ${RFValue(5)}px;
`;