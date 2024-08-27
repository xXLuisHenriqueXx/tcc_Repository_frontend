import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const ContainerNoteView = styled.TouchableOpacity`
    border-radius: ${RFValue(5)}px;
    width: 100%;
    height: ${RFValue(90)}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 ${RFValue(16)}px;
    margin-bottom: ${RFValue(20)}px;
    margin-left: auto;
    margin-right: auto;
    background-color: ${({ theme }) => theme.colors.bgContainerColorActive};
`;

export const ContainerTitleDate = styled.View`
    flex-direction: column;
`

export const TextDateNote = styled.Text`
    font-size: ${RFValue(12)}px;
    color: ${({ theme }) => theme.colors.highlightColor};
`;  

export const TitleNote = styled.Text`
    font-size: ${RFValue(22)}px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
`;

export const DeleteButton = styled.TouchableOpacity`
    position: absolute;
    top: ${RFValue(10)}px;
    right: ${RFValue(10)}px;
`;