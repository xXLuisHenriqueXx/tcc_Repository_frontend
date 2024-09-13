import React from 'react';
import { BgButton, ContainerButton } from './styled';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

interface BotaoAddProps {
    navigate: () => void;
}

const BotaoAdd = ({ navigate }: BotaoAddProps) => {
    const theme = useTheme();

    return (
        <ContainerButton
            onPress={navigate}
        >
            <BgButton
                source={theme.images.bgButton}
            >
                <Feather 
                    name='plus'
                    size={30}
                    color={theme.colors.bgColor}
                />
            </BgButton>
        </ContainerButton>
    )
}

export default BotaoAdd;