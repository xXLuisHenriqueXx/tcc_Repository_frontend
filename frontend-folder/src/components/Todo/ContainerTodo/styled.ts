import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

interface ContainerTodoViewProps {
    isDone: boolean;
}

export const ContainerTodoView = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})<ContainerTodoViewProps>`
    border-radius: ${RFValue(5)}px;
    width: 90%;
    height: ${RFValue(90)}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-self: center;
    padding: 0 ${RFValue(16)}px;
    margin-bottom: ${RFValue(20)}px;
    margin-left: auto;
    margin-right: auto;
    background-color: ${({ theme, isDone }) => isDone ? theme.colors.bgContainerColorInactive : theme.colors.bgContainerColorActive};
`;

export const ContainerTitleDate = styled.View`
    width: 60%;
    flex-direction: column;
`

export const TextDateTodo = styled.Text<ContainerTodoViewProps>`
    font-size: ${RFValue(10)}px;
    color: ${({ theme, isDone }) => isDone ?  theme.colors.textInactive : theme.colors.highlightColor};
`;  

export const TitleTodo = styled.Text<ContainerTodoViewProps>`
    font-size: ${RFValue(20)}px;
    font-weight: 500;
    color: ${({ theme, isDone }) => isDone ? theme.colors.textInactive : theme.colors.text};
`;