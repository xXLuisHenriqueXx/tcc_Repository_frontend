import React from 'react'
import { Container, ContainerInfoText, NormalText, Title } from './styled'
import { useTheme } from 'styled-components'
import { ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

interface LoaderProps {
    type: string;
}

const Loader = ({ type }: LoaderProps) => {
    const theme = useTheme();

    return (
        <Container>
            <ActivityIndicator size={RFValue(100)} color={theme.colors.highlightColor} />

            <ContainerInfoText>
                <Title>Carregando...</Title>
                {type === 'save' && <NormalText>Por favor, aguarde enquanto salvamos as informações.</NormalText>}
                {type === 'load' && <NormalText>Por favor, aguarde enquanto carregamos as informações.</NormalText>}
            </ContainerInfoText>
        </Container>
    )
}

export default Loader