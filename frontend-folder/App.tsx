import React, { useState } from "react";
import { StatusBar } from "react-native";
import { ThemeContext } from "./src/styles/themeContext";
import { ThemeProvider } from "styled-components/native";
import { useTheme } from "styled-components";
import { darkTheme, lightTheme } from "./src/styles";
import Routes from "./src/routes";
import { AuthContextProvider } from "./src/contexts/AuthContext";
import 'react-native-reanimated';
import 'react-native-gesture-handler'


export default function App() {
  const [theme, setTheme] = useState<typeof darkTheme>(darkTheme);

  const toggleTheme = () => {
    setTheme(theme === darkTheme ? lightTheme : darkTheme);
  }

  return (
    <AuthContextProvider>
      <StatusBar barStyle={theme === darkTheme ? 'light-content' : 'dark-content'} backgroundColor={theme === darkTheme ? '#0d0921' : '#fefefe' } />
      <ThemeContext.Provider value={{ toggleTheme }}>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </ThemeContext.Provider>
    </AuthContextProvider>
  )
}