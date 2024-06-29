import React from 'react'
import { useTheme } from 'styled-components';
import { InputTitleTextInput, InputTitleView } from './styled';
import { Feather } from '@expo/vector-icons';

interface InputTitleProps {
    title: string;
    setTitle: (title: string) => void;
    placeholder?: string;
}

const InputTitle = ({ title, setTitle, placeholder }: InputTitleProps) => {
    const theme = useTheme();

    return (
        <InputTitleView>
            <Feather name='file-text' size={24} color={theme.colors.highlightColor} />
            <InputTitleTextInput 
                placeholder={placeholder ? placeholder : "Digite um título..."}
                placeholderTextColor={theme.colors.textInactive}
                value={title}
                onChangeText={setTitle}
            />
        </InputTitleView>
    )
}

export default InputTitle;