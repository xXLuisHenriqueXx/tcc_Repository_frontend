import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.ScrollView.attrs({
    contentContainerStyle: {
        flexGrow: 1
    }
})`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.bgColor};
`;

export const ContainerInputs = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const ContainerInputsView = styled.View`
    width: 100%;
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.bgContainerColorActive};
    border-top-left-radius: ${RFValue(30)}px;
    border-top-right-radius: ${RFValue(30)}px;
`;

export const ContainerInputsTitle = styled.View`
    width: 90%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: ${RFValue(40)}px 0 ${RFValue(20)}px 0;
`;

export const ContainerTitle = styled.Text`
    width: 100%;
    font-size: ${RFValue(20)}px;
    color: ${({ theme }) => theme.colors.highlightColor};
    font-weight: bold;
`;

export const InputTitle = styled.TextInput`
    width: 100%;
    height: ${RFValue(40)}px;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(16)}px;
    border-bottom-width: ${RFValue(1)}px;
    border-bottom-color: ${({ theme }) => theme.colors.highlightColor};
`;

export const AddTaskButton = styled.TouchableOpacity`
    width: 90%;
    height: ${RFValue(50)}px;
    background-color: ${({ theme }) => theme.colors.highlightColor};
    border-radius: ${RFValue(5)}px;
    justify-content: center;
    align-items: center;
`;

export const AddTaskButtonText = styled.Text`
    font-size: ${RFValue(16)}px;
    color: ${({ theme }) => theme.colors.bgColor};
    font-weight: bold;
`;

export const TasksContainer = styled.View`
    width: 90%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-top: ${RFValue(20)}px;
    border-top-width: ${RFValue(1)}px;
    border-top-color: ${({ theme }) => theme.colors.bdColor};
`;

export const TasksContainerTitle = styled.Text`
    width: 90%;
    font-size: ${RFValue(20)}px;
    color: ${({ theme }) => theme.colors.highlightColor};
    font-weight: bold;
    text-align: center;
    padding: ${RFValue(20)}px 0;
`;

export const TaskContainer = styled.View`
    width: 90%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: ${RFValue(10)}px 0;
    border-bottom-width: ${RFValue(1)}px;
    border-bottom-color: ${({ theme }) => theme.colors.bdColor};    
`;