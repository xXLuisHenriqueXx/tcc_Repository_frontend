import React, { useState } from 'react';
import { ConfigButton, Container } from './styled';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import Navbar from '../Navbar';
import { RFValue } from 'react-native-responsive-fontsize';
import ConfigSideModal from '../ConfigSideModal';

interface ContainerGradientProps {
    children: React.ReactNode;
    screen: string;
}

const ContainerGradient = ({ children, screen }: ContainerGradientProps) => {
    const theme = useTheme();

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    return (
        <Container
            colors={theme.colors.bgMainColor}
        >
            <ConfigButton onPress={() => setModalVisible(true)}>
                <Feather name="menu" size={RFValue(24)} color={theme.colors.text} />
            </ConfigButton>
            {children}

            {modalVisible && <ConfigSideModal modalVisible={modalVisible} setModalVisible={setModalVisible} />}

            <Navbar screen={screen} />
        </Container>
    )
}

export default ContainerGradient;