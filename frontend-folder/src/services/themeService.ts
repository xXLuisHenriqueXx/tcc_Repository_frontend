import AsyncStorage from "@react-native-async-storage/async-storage";

const themeService = {
    getTheme: async () => {
        const theme = await AsyncStorage.getItem("@theme");

        return theme as 'dark' | 'light' | null;
    },

    setTheme: async (theme: string) => {
        await AsyncStorage.setItem("@theme", theme);
    }
};

export default themeService;