import React, { useEffect, useState } from "react";
import { Alert, Platform, StatusBar } from "react-native";
import { ThemeContext } from "./src/styles/themeContext";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./src/styles";
import Routes from "./src/routes";
import { AuthContextProvider } from "./src/contexts/AuthContext";
import * as Notification from 'expo-notifications';
import 'react-native-reanimated';
import 'react-native-gesture-handler'

Notification.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

export default function App() {
  const [theme, setTheme] = useState<typeof darkTheme>(darkTheme);
  const [notification, setNotification] = useState<Notification.Notification | null>(null);

  useEffect(() => {
    requestPermission();

    const subscription = Notification.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    return () => subscription.remove();
  }, []);

  async function requestPermission() {
    const { status } = await Notification.getPermissionsAsync();
    if (status !== 'granted') {
      const { status } = await Notification.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Sem permissão para notificações', 'Você não permitiu que o aplicativo envie notificações.');
        return;
      }
    }
  }

  const toggleTheme = () => {
    setTheme(theme === darkTheme ? lightTheme : darkTheme);
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      Notification.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notification.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  }, []);

  return (
    <AuthContextProvider>
      <StatusBar barStyle={theme === darkTheme ? 'light-content' : 'dark-content'} backgroundColor={theme === darkTheme ? '#0d0921' : '#fefefe'} />
      <ThemeContext.Provider value={{ toggleTheme }}>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </ThemeContext.Provider>
    </AuthContextProvider>
  )
}