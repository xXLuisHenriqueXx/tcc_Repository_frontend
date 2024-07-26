import React from 'react'
import { BackButton, ButtonAdd, ContainerHeader, Input } from './styled'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { PropsStack } from '../../../routes'
import { useTheme } from 'styled-components'
import { RFValue } from 'react-native-responsive-fontsize'

interface DefaultHeaderProps{
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
        <ContainerHeader style={{marginBottom: RFValue(marginBottom)}}>
            <BackButton onPress={() => navigation.goBack()}>
                <Feather name="arrow-left" size={24} color={theme.colors.bgColor} />
            </BackButton>

            <Input
                placeholder={placeholderText}
                placeholderTextColor={theme.colors.textInactive}
                value={title}
                onChangeText={setTitle}
            />

            <ButtonAdd
                activeOpacity={0.85}
                onPress={handleSave}
            >
                <Feather name="check" size={25} color={theme.colors.text} />
            </ButtonAdd>
        </ContainerHeader>
    )
}

export default DefaultHeader