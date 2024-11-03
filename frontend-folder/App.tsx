import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";
import * as SplashScreen from 'expo-splash-screen';
import { Karantina_400Regular, Karantina_700Bold, useFonts } from '@expo-google-fonts/karantina';
import 'react-native-reanimated';
import 'react-native-gesture-handler';

import Routes from "./src/routes";
import { ThemeContext } from "./src/styles/themeContext";
import { darkTheme, lightTheme } from "./src/styles";
import { AuthContextProvider } from "./src/contexts/AuthContext";
import themeService from "./src/services/themeService";

export default function App() {
  const [theme, setTheme] = useState<typeof darkTheme>(darkTheme);
  const [fontsLoaded] = useFonts({
    "Karantina-Regular": Karantina_400Regular,
    "Karantina-Bold": Karantina_700Bold
  })

  useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();

        const storedTheme = await themeService.getTheme();
        if (storedTheme) {
          setTheme(storedTheme === 'dark' ? darkTheme : lightTheme);
        }
        
      } catch (error) {
        console.warn(error);

      } finally {
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      }
    };

    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === darkTheme ? lightTheme : darkTheme);

    themeService.setTheme(theme === darkTheme ? 'light' : 'dark');
  }

  return (
    <AuthContextProvider>
      <StatusBar barStyle={theme === darkTheme ? 'light-content' : 'dark-content'} backgroundColor={theme === darkTheme ? '#0d0921' : '#fefefe'} />
      < ThemeContext.Provider value={{ toggleTheme }}>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </ThemeContext.Provider >
    </AuthContextProvider >
  )
}