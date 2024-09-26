import React from 'react';
import { BackButton, ButtonAdd, ContainerHeader, Input } from './styled';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { ArrowLeft, Check } from 'lucide-react-native';

import { PropsStack } from '../../../routes';

interface DefaultHeaderProps {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    handleSave: () => Promise<void>;
    placeholderText?: string;
    marginBottom: number;
}

const DefaultHeader = ({ title, setTitle, handleSave, placeholderText, marginBottom }: DefaultHeaderProps) => {
    const navigation = useNavigation<PropsStack>();
    const theme = useTheme();

    return (
        <ContainerHeader style={{ marginBottom: RFValue(marginBottom) }}>
            <BackButton onPress={() => navigation.goBack()}>
                <ArrowLeft size={RFValue(20)} color={theme.colors.bgColor} strokeWidth={RFValue(2)} />
            </BackButton>

            <Input
                placeholder={placeholderText}
                placeholderTextColor={theme.colors.textInactive}
                value={title}
                onChangeText={setTitle}
            />

            <ButtonAdd onPress={handleSave}>
                <Check size={RFValue(20)} color={theme.colors.text} strokeWidth={RFValue(2)} />
            </ButtonAdd>
        </ContainerHeader>
    )
}

export default DefaultHeader