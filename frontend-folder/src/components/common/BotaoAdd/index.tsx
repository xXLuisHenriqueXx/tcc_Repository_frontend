import React from 'react';
import { BgButton, ContainerButton } from './styled';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { Plus } from 'lucide-react-native';

interface BotaoAddProps {
    navigate: () => void;
}

const BotaoAdd = ({ navigate }: BotaoAddProps) => {
    const theme = useTheme();

    return (
        <ContainerButton onPress={navigate}>
            <BgButton source={theme.images.bgButton}>
                <Plus  size={RFValue(28)} color={theme.colors.bgColor} strokeWidth={RFValue(2)} />
            </BgButton>
        </ContainerButton>
    )
}

export default BotaoAdd;