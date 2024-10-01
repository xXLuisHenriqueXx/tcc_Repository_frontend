import React from 'react';
import { ButtonText, Container, IconButton } from './styled';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { Bell, BookmarkCheck, CircleUser, StickyNote, Timer } from 'lucide-react-native';

import { PropsStack } from '../../../routes';
import useAuth from '../../../hook/useAuth';

interface NavbarProps {
    screen: string;
};


export default function Navbar({ screen }: NavbarProps) {
    const navigation = useNavigation<PropsStack>();
    const theme = useTheme();

    const { token } = useAuth();

    const navigateToPomodoro = () => {
        navigation.navigate("Pomodoro");
    };

    const navigateToAlarms = () => {
        token === null
            ? navigation.navigate("Welcome")
            : navigation.navigate("Alarms", { newAlarm: false });
    };

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

    const navigateToUser = () => {
        token === null
            ? navigation.navigate("Welcome")
            : navigation.navigate("User")
    }

    const size = RFValue(24);
    const colorPomodoro = screen === "Pomodoro" ? theme.colors.tintActiveColor : theme.colors.tintInactiveColor;
    const colorAlarm = screen === "Alarms" ? theme.colors.tintActiveColor : theme.colors.tintInactiveColor;
    const colorNote = screen === "Notes" ? theme.colors.tintActiveColor : theme.colors.tintInactiveColor;
    const colorTodo = screen === "Todos" ? theme.colors.tintActiveColor : theme.colors.tintInactiveColor;
    const colorUser = screen === "User" ? theme.colors.tintActiveColor : theme.colors.tintInactiveColor;
    const iconPomodoro = screen === "Pomodoro" ? 2 : 1;
    const iconAlarm = screen === "Alarms" ? 2 : 1;
    const iconNote = screen === "Notes" ? 2 : 1;
    const iconTodo = screen === "Todos" ? 2 : 1;
    const iconUser = screen === "User" ? 2 : 1;

    return (
        <Container
            style={{
                shadowColor: theme.colors.text,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 16,
                elevation: 20,
            }}
        >
            <IconButton onPress={navigateToPomodoro}>
                <Timer size={size} color={colorPomodoro} strokeWidth={iconPomodoro} />
                {screen === "Pomodoro" ? (
                    <ButtonText screenEnabled={true}>Pomodoro</ButtonText>
                ) : (
                    <ButtonText screenEnabled={false}>Pomodoro</ButtonText>
                )}
            </IconButton>

            <IconButton onPress={navigateToAlarms}>
                <Bell size={size} color={colorAlarm} strokeWidth={iconAlarm} />
                {screen === "Alarms" ? (
                    <ButtonText screenEnabled={true}>Alarmes</ButtonText>
                ) : (
                    <ButtonText screenEnabled={false}>Alarmes</ButtonText>
                )}
            </IconButton>

            <IconButton onPress={navigateToNotes}>
                <StickyNote size={size} color={colorNote} strokeWidth={iconNote} />
                {screen === "Notes" ? (
                    <ButtonText screenEnabled={true}>Notas</ButtonText>
                ) : (
                    <ButtonText screenEnabled={false}>Notas</ButtonText>
                )}
            </IconButton>

            <IconButton onPress={navigateToTodos}>
                <BookmarkCheck size={size} color={colorTodo} strokeWidth={iconTodo} />
                {screen === "Todos" ? (
                    <ButtonText screenEnabled={true}>Lista de tarefas</ButtonText>
                ) : (
                    <ButtonText screenEnabled={false}>Lista de tarefas</ButtonText>
                )}
            </IconButton>

            <IconButton onPress={navigateToUser}>
                <CircleUser size={size} color={colorUser} strokeWidth={iconUser} />
                {screen === "User" ? (
                    <ButtonText screenEnabled={true}>Usuário</ButtonText>
                ) : (
                    <ButtonText screenEnabled={false}>Usuário</ButtonText>
                )}
            </IconButton>
        </Container>
    )
}