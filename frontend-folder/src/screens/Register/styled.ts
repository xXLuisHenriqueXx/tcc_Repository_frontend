import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.bgColor};
`;

export const BackButton = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.highlightColor};
    border-radius: ${RFValue(50)}px;
    width: ${RFValue(50)}px;
    height: ${RFValue(50)}px;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: ${RFValue(20)}px;
    left: ${RFValue(20)}px;
`;

export const ContainerView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const ContainerText = styled.View`
    flex-direction: column;
    align-items: center;
    width: 90%;
    margin-bottom: ${RFValue(80)}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(30)}px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.highlightColor};
    text-align: center;
`;

export const NormalText = styled.Text`
    font-size: ${RFValue(18)}px;
    color: ${({ theme }) => theme.colors.text};
    text-align: center;
`;

export const ContainerForm = styled.View`
    width: 90%;
    flex-direction: column;
    align-items: center;
`;

export const InputContainer = styled.View`
    width: 100%;
    height: ${RFValue(30)}px;
    flex-direction: row;
    align-items: center;
    border-bottom-width: ${RFValue(1)}px;
    border-bottom-color: ${({ theme }) => theme.colors.highlightColor};
    margin-bottom: ${RFValue(40)}px;
`;

export const Input = styled.TextInput`
    flex: 1;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(18)}px;
    margin-left: ${RFValue(5)}px;
`;

export const RegisterButton = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.highlightColor};
    width: 100%;
    height: ${RFValue(70)}px;
    border-radius: ${RFValue(10)}px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: ${RFValue(30)}px;
`;

export const RegisterButtonText = styled.Text`
    font-size: ${RFValue(25)}px;
    color: ${({ theme }) => theme.colors.bgColor};
    font-weight: bold;
`;