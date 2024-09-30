import React, { useEffect, useState } from "react";
import { Alert, Platform, StatusBar } from "react-native";
import { ThemeContext } from "./src/styles/themeContext";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./src/styles";
import Routes from "./src/routes";
import { AuthContextProvider } from "./src/contexts/AuthContext";
import * as Notifications from 'expo-notifications';
import 'react-native-reanimated';
import 'react-native-gesture-handler'

export default function App() {
  const [theme, setTheme] = useState<typeof darkTheme>(darkTheme);

  useEffect(() => {
    registerForPushNotificationsAsync();

    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    return () => subscription.remove();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
      });
    }

    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Aviso', 'A permisssão de notificações é necessário para o funcionamento pleno!');
    } 
  };

  const toggleTheme = () => {
    setTheme(theme === darkTheme ? lightTheme : darkTheme);
  }

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