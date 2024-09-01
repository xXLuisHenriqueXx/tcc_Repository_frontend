import React from 'react'
import { CatGifLoading, Container, ContainerInfoText, NormalText, Title } from './styled'
import { useTheme } from 'styled-components'
interface LoaderProps {
    type: string;
}

const Loader = ({ type }: LoaderProps) => {
    const theme = useTheme();

    return (
        <Container>
            <CatGifLoading source={theme.images.catLoadingGif} />

            <ContainerInfoText>
                <Title>Carregando...</Title>
                {type === 'save' && <NormalText>Por favor, aguarde enquanto salvamos as informações.</NormalText>}
                {type === 'load' && <NormalText>Por favor, aguarde enquanto carregamos as informações.</NormalText>}
            </ContainerInfoText>
        </Container>
    )
}

export default Loader