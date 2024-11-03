import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const ContainerNoteView = styled.TouchableOpacity.attrs({
    activeOpacity: 0.85
})`
    border-radius: ${RFValue(5)}px;
    width: 90%;
    height: ${RFValue(90)}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-self: center;
    padding: ${RFValue(16)}px;
    margin-bottom: ${RFValue(20)}px;
    margin-left: auto;
    margin-right: auto;
    background-color: ${({ theme }) => theme.colors.bgContainerColorActive};
`;

export const ContainerTitleDate = styled.View`
    width: 60%;
    flex-direction: column;
`

export const TextDateNote = styled.Text`
    font-size: ${RFValue(10)}px;
    color: ${({ theme }) => theme.colors.highlightColor};
`;  

export const TitleNote = styled.Text`
    font-size: ${RFValue(20)}px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
`;

export const TextContainer = styled.Text`
    width: 32%;
    height: 100%;
    font-size: ${RFValue(10)}px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.text};
`;