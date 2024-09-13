import React, { useContext } from 'react';
import { BackButton, Container, ContainerButton } from './styled';
import { useTheme } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';

import { PropsStack } from '../../routes';
import { ThemeContext } from '../../styles/themeContext';
import useAuth from '../../hook/useAuth';

const ConfigScreen = () => {
    const theme = useTheme();
    const navigation = useNavigation<PropsStack>();

    const { toggleTheme } = useContext(ThemeContext);

    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    }

    return (
        <Container>
            <BackButton
                onPress={() => navigation.goBack()}
            >
                <Feather name="arrow-left" size={RFValue(20)} color={theme.colors.bgColor} />
            </BackButton>

            <ContainerButton onPress={toggleTheme}>
                <FontAwesome5 name='moon' size={RFValue(26)} color={theme.colors.text} />
            </ContainerButton>

            <ContainerButton onPress={handleLogout}>
                <Feather name='log-out' size={RFValue(26)} color={theme.colors.text} />
            </ContainerButton>
        </Container>
    )
}

export default ConfigScreen;