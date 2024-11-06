import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const ContainerImage = styled.ImageBackground.attrs({
    resizeMode: "cover"
})`
    flex: 1;
    justify-content: center;
    align-items: center;
`;