import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const ContainerNoteView = styled.View`
    border-radius: ${RFValue(5)}px;
    width: 90%;
    height: ${RFValue(105)}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 ${RFValue(26)}px;
    margin-bottom: ${RFValue(20)}px;
    margin-left: auto;
    margin-right: auto;
    background-color: ${({ theme }) => theme.colors.bgContainerColorActive};
`;

export const TextDateNote = styled.Text`
    font-size: ${RFValue(14)}px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.highlightColor};
`;  

export const TitleNote = styled.Text`
    font-size: ${RFValue(45)}px;
    font-weight: bold;
    margin-bottom: ${RFValue(-5)}px;
    color: ${({ theme }) => theme.colors.text};
`;
