import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { MotiView } from "moti";

export const Container = styled.ScrollView.attrs({
    contentContainerStyle: {
        flexGrow: 1
    }
})`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.bgColor};
`;

export const ContainerInputs = styled(MotiView)`
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
    padding: 0 ${RFValue(16)}px;
`;

export const ContainerInputLine = styled.View`
    width: ${RFValue(140)}px;
    height: ${RFValue(6)}px;
    border-radius: ${RFValue(3)}px;
    background-color: ${({ theme }) => theme.colors.bgColor};
    margin: ${RFValue(20)}px 0;
`;

export const InputTitle = styled.TextInput`
    width: 100%;
    height: ${RFValue(50)}px;
    color: ${({ theme }) => theme.colors.text};
    border-radius: ${RFValue(5)}px;
    background-color: ${({ theme }) => theme.colors.bgContainerColorActive};
    font-size: ${RFValue(14)}px;
    padding: 0 ${RFValue(8)}px;
    margin: ${RFValue(16)}px 0;
`;

export const AddTaskButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
    width: 100%;
    height: ${RFValue(50)}px;
    background-color: ${({ theme }) => theme.colors.highlightColor};
    border-radius: ${RFValue(5)}px;
    justify-content: center;
    align-items: center;
`;

export const AddTaskButtonText = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.bgColor};
    font-weight: 600;
`;

export const TasksContainer = styled.View`
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-top: ${RFValue(16)}px;
    padding-top: ${RFValue(16)}px;
    border-top-width: ${RFValue(2)}px;
    border-top-color: ${({ theme }) => theme.colors.bdColor};
`;

export const TaskContainer = styled.View`
    width: 100%;
    height: ${RFValue(40)}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;  
`;

export const TaskTitle = styled.Text`
    width: 74%;
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.text};
    margin-left: ${RFValue(10)}px;
    margin-right: auto;
`;

export const TaskDoneButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
    width: ${RFValue(16)}px;
    height: ${RFValue(16)}px;
    justify-content: center;
    align-items: center;
    border: ${RFValue(1)}px solid ${({ theme }) => theme.colors.highlightColor};
`;

export const TaskButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
`;