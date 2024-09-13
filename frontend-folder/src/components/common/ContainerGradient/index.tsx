import React from 'react';
import { ConfigButton, Container } from './styled';
import { useTheme } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

import Navbar from '../Navbar';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { PropsStack } from '../../../routes';

interface ContainerGradientProps {
    children: React.ReactNode;
    screen: string;
}

const ContainerGradient = ({ children, screen }: ContainerGradientProps) => {
    const theme = useTheme();
    const navigation = useNavigation<PropsStack>();

    const handleNavigateToConfigScreen = () => {
        navigation.navigate("ConfigScreen");
    }

    return (
        <Container
            colors={theme.colors.bgMainColor}
        >
            <ConfigButton onPress={handleNavigateToConfigScreen}>
                <Feather name="menu" size={RFValue(24)} color={theme.colors.text} />
            </ConfigButton>
            {children}

            <Navbar screen={screen} />
        </Container>
    )
}

export default ContainerGradient;