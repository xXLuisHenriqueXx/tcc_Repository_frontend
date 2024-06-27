import React from 'react'
import { Container, IconButton } from './styled'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { PropsStack } from '../../../routes';

interface NavbarProps {
    screen: string;
};


export default function Navbar({ screen }: NavbarProps) {
    const navigation = useNavigation<PropsStack>();
    const theme = useTheme();

    const navigateToAlarms = () => {
        navigation.navigate("Alarms", {newAlarm: false});
    };

    // const navigateToNotes = () => {
    //     navigation.navigate("Notes");
    // }

    // const navigateToUser = () => {
    //     navigation.navigate("Usuario");
    // }

    const size = 30;
    const colorAlarm = screen === "Alarms" ? theme.colors.tintActiveColor : theme.colors.tintInactiveColor;
    const colorNote = screen === "Notes" ? theme.colors.tintActiveColor : theme.colors.tintInactiveColor;
    const colorUser = screen === "Usuario" ? theme.colors.tintActiveColor : theme.colors.tintInactiveColor;
    const iconAlarm = screen === "Alarms" ? "bell" : "bell-o";
    const iconNote = screen === "Notes" ? "sticky-note" : "sticky-note-o";
    const iconUser = screen === "Usuario" ? "user" : "user-o";
    
    return (
        <Container>
            <IconButton onPress={navigateToAlarms}>
                <FontAwesome name={iconAlarm} size={size} color={colorAlarm} />
            </IconButton>
            {/* <IconButton onPress={navigateToNotes}>
                <FontAwesome name={iconNote} size={size} color={colorNote} />
            </IconButton>
            <IconButton onPress={navigateToUser}>
                <FontAwesome name={iconUser} size={size} color={colorUser} />
            </IconButton> */}
        </Container>
    )
}