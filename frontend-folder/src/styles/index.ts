import { DefaultTheme } from "styled-components/native";

export const darkTheme: DefaultTheme =  {
    colors: {
        text: "#FFFFFF",
        textInactive: "#FFFFFF50",
        highlightColor: "#4ACFEE",
        highlightColorInactive: "#4ACFEE50",
        bgColor: "#08041B", 
        bdColor: "#00D1FF15",
        bgContainerColorActive: "#433F6A75",
        bgContainerColorInactive: "#433F6A25",
        fadeBgColor: "#00000090",
        bgModal: "#252345",
        bgBottomTab: "#08041B",
        tintActiveColor: '#4ACFEE',
        tintInactiveColor: '#79769A60',
        trackColorInactive: "#363362",
        trackColorActive: "#4ACFEE",
        thumbColor: "#FFFFFF",
        white: "#FFFFFF",
    },
    images: {
        bgMain: require("../assets/bgDark_mainPages.jpg"),
        catImage: require("../assets/cute_cat.png"),
    }
};

export const lightTheme: DefaultTheme = {
    colors: {
        text: "#110F1F",
        textInactive: "#110F1F50",
        highlightColor: "#F87433",
        highlightColorInactive: "#F8743350",
        bgColor: "#E5F8FC", 
        bdColor: "#298A9130",
        bgContainerColorActive: "#94BEC575",
        bgContainerColorInactive: "#94BEC525",
        fadeBgColor: "#00000090",
        bgModal: "#E3F7FB",
        bgBottomTab: "#E3F7FB",
        tintActiveColor: '#F87433',
        tintInactiveColor: '#110F1F60',
        trackColorInactive: "#110F1F",
        trackColorActive: "#F87433",
        thumbColor: "#FFFFFF",
        white: "#FFFFFF",
    },
    images: {
        bgMain: require("../assets/bgLight_mainPages.jpg"),
        catImage: require("../assets/cute_cat.png")
    }
};