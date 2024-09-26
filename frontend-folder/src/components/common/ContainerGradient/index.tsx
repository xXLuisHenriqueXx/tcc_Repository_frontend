import React, { ReactNode, useState } from 'react';
import { ConfigButton, Container } from './styled';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { Menu } from 'lucide-react-native';

import Navbar from '../Navbar';
import ConfigSideModal from '../ConfigSideModal';

interface ContainerGradientProps {
    children: ReactNode;
    screen: string;
}

const ContainerGradient = ({ children, screen }: ContainerGradientProps) => {
    const theme = useTheme();

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    return (
        <Container colors={theme.colors.bgMainColor}>
            <ConfigButton onPress={() => setModalVisible(true)}>
                <Menu size={RFValue(26)} color={theme.colors.text} strokeWidth={RFValue(2)} />
            </ConfigButton>

            {children}

            {modalVisible && <ConfigSideModal modalVisible={modalVisible} setModalVisible={setModalVisible} />}

            <Navbar screen={screen} />
        </Container>
    )
}

export default ContainerGradient;