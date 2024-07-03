import React, { useState } from "react";
import { StatusBar } from "react-native";
import { ThemeContext } from "./src/styles/themeContext";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./src/styles";
import Routes from "./src/routes";
import { AuthContextProvider } from "./src/contexts/AuthContext";


export default function App() {
  const [theme, setTheme] = useState<typeof darkTheme>(darkTheme);

  const toggleTheme = () => {
    setTheme(theme === darkTheme ? lightTheme : darkTheme);
  }

  return (
    <AuthContextProvider>
      <StatusBar barStyle="light-content" backgroundColor="#0C0A1D" />
      <ThemeContext.Provider value={{ toggleTheme }}>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </ThemeContext.Provider>
    </AuthContextProvider>
  )
}