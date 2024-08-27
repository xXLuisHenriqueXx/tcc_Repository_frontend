import { DefaultTheme } from "styled-components/native";

export const darkTheme: DefaultTheme =  {
    colors: {
        text: "#ededed",
        textInactive: "#ededed80",
        highlightColor: "#4acfee",
        highlightColorInactive: "#4acfee80",
        bgMainColor: ["#0d0921","#090939"],
        bgColor: "#0d0921", 
        bdColor: "#4acfee26",
        bgContainerColorActive: "#433f6abf",
        bgContainerColorInactive: "#433f6a40",
        fadeBgColor: "#000000e6",
        bgModal: "#0d0921",
        bgBottomTab: "#08041b",
        tintActiveColor: '#4acfee',
        tintInactiveColor: '#79769a99',
        trackColorInactive: "#363362",
        trackColorActive: "#4acfee",
        thumbColor: "#ededed",
        white: "#ffffff",
    },
    images: {
        bgButton: require("../assets/bgButton_dark.png"),
        catImage: require("../assets/cute_cat.png"),
    }
};

export const lightTheme: DefaultTheme = {
    colors: {
        text: "#110f1f",
        textInactive: "#110f1f80",
        highlightColor: "#c24f4f",
        highlightColorInactive: "#c24f4f80",
        bgMainColor: ["#e5f8fc","#a5dce1"],
        bgColor: "#e5f8fc", 
        bdColor: "#c24f4f26",
        bgContainerColorActive: "#94bec5bf",
        bgContainerColorInactive: "#94bec540",
        fadeBgColor: "#000000e6",
        bgModal: "#e5f8fc",
        bgBottomTab: "#e5f8fc",
        tintActiveColor: '#c24f4f',
        tintInactiveColor: '#110f1f99',
        trackColorInactive: "#110f1f",
        trackColorActive: "#c24f4f",
        thumbColor: "#ffffff",
        white: "#ffffff",
    },
    images: {
        bgButton: require("../assets/bgButton_light.png"),
        catImage: require("../assets/cute_cat.png")
    }
};