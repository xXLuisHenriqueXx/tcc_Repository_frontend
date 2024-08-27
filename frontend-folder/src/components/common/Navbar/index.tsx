import React from 'react'
import { ButtonText, Container, IconButton } from './styled'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { PropsStack } from '../../../routes';
import useAuth from '../../../hook/useAuth';
import { RFValue } from 'react-native-responsive-fontsize';

interface NavbarProps {
    screen: string;
};


export default function Navbar({ screen }: NavbarProps) {
    const navigation = useNavigation<PropsStack>();
    const theme = useTheme();

    const { token } = useAuth();

    const navigateToAlarms = () => {
        navigation.navigate("Alarms", {newAlarm: false});
    };

    const navigateToNotes = () => {
        token === null
        ? navigation.navigate("Welcome")
        : navigation.navigate("Notes", {newNote: false});
    }

    const navigateToTodos = () => {
        token === null
        ? navigation.navigate("Welcome")
        : navigation.navigate("Todos", {newTodo: false});
    }

    const navigateToUser = () => {
        token === null
        ? navigation.navigate("Welcome")       
        : navigation.navigate("User")
    }

    const size = RFValue(24);
    const colorAlarm = screen === "Alarms" ? theme.colors.tintActiveColor : theme.colors.tintInactiveColor;
    const colorNote = screen === "Notes" ? theme.colors.tintActiveColor : theme.colors.tintInactiveColor;
    const colorTodo = screen === "Todos" ? theme.colors.tintActiveColor : theme.colors.tintInactiveColor;
    const colorUser = screen === "User" ? theme.colors.tintActiveColor : theme.colors.tintInactiveColor;
    const iconAlarm = screen === "Alarms" ? "bell" : "bell-o";
    const iconNote = screen === "Notes" ? "sticky-note" : "sticky-note-o";
    const iconTodo = screen === "Todos" ? "bookmark" : "bookmark-o"
    const iconUser = screen === "User" ? "user" : "user-o";
    
    return (
        <Container>
            <IconButton onPress={navigateToAlarms}>
                <FontAwesome name={iconAlarm} size={size} color={colorAlarm} />
                {screen === "Alarms" ? (
                    <ButtonText screenEnabled={true}>Alarmes</ButtonText>
                ) : (
                    <ButtonText screenEnabled={false}>Alarmes</ButtonText>
                )}
            </IconButton>
            <IconButton onPress={navigateToNotes}>
                <FontAwesome name={iconNote} size={size} color={colorNote} />
                {screen === "Notes" ? (
                    <ButtonText screenEnabled={true}>Notas</ButtonText>
                ) : (
                    <ButtonText screenEnabled={false}>Notas</ButtonText>
                )}
            </IconButton>
            <IconButton onPress={navigateToTodos}>
                <FontAwesome name={iconTodo} size={size} color={colorTodo} />
                {screen === "Todos" ? (
                    <ButtonText screenEnabled={true}>Lista de tarefas</ButtonText>
                ) : (
                    <ButtonText screenEnabled={false}>Lista de tarefas</ButtonText>
                )}
            </IconButton>
            <IconButton onPress={navigateToUser}>
                <FontAwesome name={iconUser} size={size} color={colorUser} />
                {screen === "User" ? (
                    <ButtonText screenEnabled={true}>Usuário</ButtonText>
                ) : (
                    <ButtonText screenEnabled={false}>Usuário</ButtonText>
                )}
            </IconButton>
        </Container>
    )
}