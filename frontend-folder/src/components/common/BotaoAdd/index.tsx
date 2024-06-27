import React from 'react'
import { useTheme } from 'styled-components';
import { BgButton, ContainerButton } from './styled';
import { Feather } from '@expo/vector-icons'

interface BotaoAddProps {
    navigate: () => void;
}

const BotaoAdd = ({ navigate }: BotaoAddProps) => {
    const theme = useTheme();

    return (
        <ContainerButton>
            <BgButton
                activeOpacity={0.8}
                onPress={navigate}
            >
                <Feather 
                    name='plus'
                    size={30}
                    color={theme.colors.textAlternative}
                />
            </BgButton>
        </ContainerButton>
    )
}

export default BotaoAdd;