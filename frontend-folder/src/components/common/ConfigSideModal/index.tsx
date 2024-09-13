import React, { useContext, useEffect, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { ContainerSide, ContainerButton, ContainerScreen } from './styled';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather, FontAwesome5 } from '@expo/vector-icons';

import { ThemeContext } from '../../../styles/themeContext';
import useAuth from '../../../hook/useAuth';

interface ConfigSideModalProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
}

const ConfigSideModal = ({ setModalVisible }: ConfigSideModalProps) => {
    const theme = useTheme();

    const { toggleTheme } = useContext(ThemeContext);
    const { logout } = useAuth();

    const [isClosing, setIsClosing] = useState(false);

    return (
        <TouchableWithoutFeedback onPress={() => {
            setIsClosing(true)
            setTimeout(() => setModalVisible(false), 300);
        }}>
            <ContainerScreen
                transition={{ type: "timing", duration: 300 }}
                from={{ opacity: isClosing ? 1 : 0 }}
                animate={{ opacity: isClosing ? 0 : 1 }}
            >
                <TouchableWithoutFeedback>
                    <ContainerSide
                        transition={{ type: "timing", duration: 300 }}
                        from={{ translateX: isClosing ? 0 : -300 }}
                        animate={{ translateX: isClosing ? -300 : 0 }}
                    >
                        <ContainerButton onPress={toggleTheme}>
                            <FontAwesome5 name='moon' size={RFValue(26)} color={theme.colors.text} />
                        </ContainerButton>

                        <ContainerButton onPress={() => logout()}>
                            <Feather name='log-out' size={RFValue(26)} color={theme.colors.text} />
                        </ContainerButton>
                    </ContainerSide>
                </TouchableWithoutFeedback>
            </ContainerScreen>
        </TouchableWithoutFeedback>
    )
}

export default ConfigSideModal;