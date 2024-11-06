import React, { ReactNode } from 'react';
import { BackButton, Container, ContainerView } from './styled';
import { ArrowLeft } from 'lucide-react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { PropsStack } from '../../../routes';
import { useTheme } from 'styled-components';

interface WelcomeRootNoImageProps {
    children: ReactNode
}

const WelcomeRootNoImage = ({ children }: WelcomeRootNoImageProps) => {
    const navigation = useNavigation<PropsStack>();
    const theme = useTheme();
    
    return (
        <Container>
            <BackButton onPress={() => navigation.goBack()}>
                <ArrowLeft size={RFValue(20)} color={theme.colors.bgColor} strokeWidth={RFValue(2)} />
            </BackButton>

            <ContainerView>
                { children }
            </ContainerView>
        </Container>
    )
}

export default WelcomeRootNoImage;