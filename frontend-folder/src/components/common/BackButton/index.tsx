import React from 'react';
import { BackButtonContainer } from './styled';
import { useNavigation } from '@react-navigation/native';
import { PropsStack } from '../../../routes';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import * as Haptics from 'expo-haptics';
import { ArrowLeft } from 'lucide-react-native';

const BackButton = () => {
    const navigation = useNavigation<PropsStack>();
    const theme = useTheme();

    return (
        <BackButtonContainer onPress={() => {
            Haptics.selectionAsync();

            navigation.goBack()
        }}>
            <ArrowLeft size={RFValue(20)} color={theme.colors.bgColor} strokeWidth={RFValue(2)} />
        </BackButtonContainer>
    )
}

export default BackButton;