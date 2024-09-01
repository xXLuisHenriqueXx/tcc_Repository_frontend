import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native"

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.bgColor};
    justify-content: center;
    align-items: center;
`;

export const CatGifLoading = styled.Image.attrs({
    resizeMode: 'contain'
})`
    width: ${RFValue(128)}px;
    height: ${RFValue(128)}px;
`;

export const ContainerInfoText = styled.View`
    position: absolute;
    width: 100%;
    bottom: ${RFValue(80)}px;
    padding: 0 ${RFValue(16)}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(20)}px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.highlightColor};
    margin: ${RFValue(8)}px 0;
    text-align: center;
`;

export const NormalText = styled.Text`
    font-size: ${RFValue(14)}px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.text};
    text-align: center;
`;