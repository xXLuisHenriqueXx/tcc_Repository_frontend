import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { ThemeContext } from "./src/styles/themeContext";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./src/styles";
import Routes from "./src/routes";
import { AuthContextProvider } from "./src/contexts/AuthContext";
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import themeService from "./src/services/themeService";
import { MotiView } from "moti";

const splashScreen = require('./src/assets/splashScreen.png');

export default function App() {
  const [theme, setTheme] = useState<typeof darkTheme>(darkTheme);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);

    themeService.getTheme().then((storedTheme) => {
      if (storedTheme) {
        setTheme(storedTheme === 'dark' ? darkTheme : lightTheme);
      }
    });

    setIsLoading(false);
  }, []);

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