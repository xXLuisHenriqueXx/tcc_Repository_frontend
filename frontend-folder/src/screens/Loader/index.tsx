import React from 'react'
import { Container } from './styled'
import { useTheme } from 'styled-components'
import { ActivityIndicator } from 'react-native';

const Loader = () => {
    const theme = useTheme();

    return (
        <Container>
            <ActivityIndicator size={"large"} color={theme.colors.highlightColor} />
        </Container>
    )
}

export default Loader