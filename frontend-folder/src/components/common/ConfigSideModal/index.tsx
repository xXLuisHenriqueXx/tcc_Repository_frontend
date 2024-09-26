import React, { useContext, useEffect, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { ContainerSide, ContainerButton, ContainerScreen, ContainerUser, UserImage, UserName, ContainerButtonText } from './styled';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { Bell, BookmarkCheck, LogOut, StickyNote, SunMoon, Timer } from 'lucide-react-native';

import { ThemeContext } from '../../../styles/themeContext';
import useAuth from '../../../hook/useAuth';
import { useNavigation } from '@react-navigation/native';
import { PropsStack } from '../../../routes';

interface ConfigSideModalProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
}

const ConfigSideModal = ({ setModalVisible }: ConfigSideModalProps) => {
    const theme = useTheme();
    const navigation = useNavigation<PropsStack>();
    const { toggleTheme } = useContext(ThemeContext);
    const { logout, token } = useAuth();

    const [isClosing, setIsClosing] = useState<boolean>(false);

    const navigateToAlarms = () => {
        navigation.navigate("Alarms", { newAlarm: false });
    };

    const navigateToPomodoro = () => {
        navigation.navigate("Pomodoro");
    }

    const navigateToNotes = () => {
        token === null
            ? navigation.navigate("Welcome")
            : navigation.navigate("Notes", { newNote: false });
    }

    const navigateToTodos = () => {
        token === null
            ? navigation.navigate("Welcome")
            : navigation.navigate("Todos", { newTodo: false });
    }

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
                        <ContainerUser>
                            <UserImage />
                            <UserName>Placeholder</UserName>
                        </ContainerUser>

                        <ContainerButton onPress={() => {
                            navigateToPomodoro();
                            setIsClosing(true)
                            setTimeout(() => setModalVisible(false), 300);
                        }}>
                            <ContainerButtonText>Pomodoro</ContainerButtonText>
                            <Timer style={{ position: 'absolute', left: RFValue(8) }} size={RFValue(20)} color={theme.colors.text} strokeWidth={RFValue(2)} />
                        </ContainerButton>

                        <ContainerButton onPress={() => {
                            navigateToAlarms();
                            setIsClosing(true)
                            setTimeout(() => setModalVisible(false), 300);
                        }}>
                            <ContainerButtonText>Alarmes</ContainerButtonText>
                            <Bell style={{ position: 'absolute', left: RFValue(8) }} size={RFValue(20)} color={theme.colors.text} strokeWidth={RFValue(2)} />
                        </ContainerButton>

                        <ContainerButton onPress={() => {
                            navigateToNotes();
                            setIsClosing(true)
                            setTimeout(() => setModalVisible(false), 300);
                        }}>
                            <ContainerButtonText>Notas</ContainerButtonText>
                            <StickyNote style={{ position: 'absolute', left: RFValue(8) }} size={RFValue(20)} color={theme.colors.text} strokeWidth={RFValue(2)} />
                        </ContainerButton>

                        <ContainerButton onPress={() => {
                            navigateToTodos();
                            setIsClosing(true)
                            setTimeout(() => setModalVisible(false), 300);
                        }}>
                            <ContainerButtonText>Listas de tarefa</ContainerButtonText>
                            <BookmarkCheck style={{ position: 'absolute', left: RFValue(8) }} size={RFValue(20)} color={theme.colors.text} strokeWidth={RFValue(2)} />
                        </ContainerButton>

                        <ContainerButton onPress={toggleTheme}>
                            <ContainerButtonText>Mudar tema</ContainerButtonText>
                            <SunMoon style={{ position: 'absolute', left: RFValue(8) }} size={RFValue(20)} color={theme.colors.text} strokeWidth={RFValue(2)} />
                        </ContainerButton>

                        <ContainerButton onPress={() => logout()}>
                            <ContainerButtonText>Desconectar</ContainerButtonText>
                            <LogOut style={{ position: 'absolute', left: RFValue(8) }} size={RFValue(20)} color={theme.colors.text} strokeWidth={RFValue(2)} />
                        </ContainerButton>
                    </ContainerSide>
                </TouchableWithoutFeedback>
            </ContainerScreen>
        </TouchableWithoutFeedback>
    )
}

export default ConfigSideModal;