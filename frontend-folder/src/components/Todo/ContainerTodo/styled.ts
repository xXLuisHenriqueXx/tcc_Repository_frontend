import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const ContainerTodoView = styled.TouchableOpacity`
    border-radius: ${RFValue(5)}px;
    width: 90%;
    height: ${RFValue(100)}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 ${RFValue(25)}px;
    margin-bottom: ${RFValue(20)}px;
    margin-left: auto;
    margin-right: auto;
    background-color: ${({ theme }) => theme.colors.bgContainerColorActive};
`;

export const ContainerTitleDate = styled.View`
    flex-direction: column;
`

export const TextDateTodo = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.highlightColor};
`;  

export const TitleTodo = styled.Text`
    font-size: ${RFValue(22)}px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
`;

export const DeleteButton = styled.TouchableOpacity`
    position: absolute;
    top: ${RFValue(10)}px;
    right: ${RFValue(10)}px;
`;