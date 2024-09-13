import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Title = styled.Text`
    margin-top: ${RFValue(60)}px;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(40)}px;
    font-weight: bold;
`;

export const NormalText = styled.Text`
    margin-top: ${RFValue(2)}px;
    margin-bottom: ${RFValue(60)}px;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(14)}px;
`;

export const NotesScrollView = styled.ScrollView.attrs({
    contentContainerStyle: {
        paddingBottom: RFValue(70),
        paddingHorizontal: RFValue(16),
        justifyContent: 'space-between'
    }
})`
    flex: 1;
    flex-direction: row;
    flex-wrap: wrap;
`;

export const ContainerNotesGrid = styled.View`
    flex: 1;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`;