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
        fadeBgColor: "#090939e6",
        bgModal: "#08041b",
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
        bgMainColor: ["#ffffff","#ffefef"],
        bgColor: "#fefefe", 
        bdColor: "#c24f4f26",
        bgContainerColorActive: "#FFC9C9bf",
        bgContainerColorInactive: "#FFC9C940",
        fadeBgColor: "#000000e6",
        bgModal: "#fefefe",
        bgBottomTab: "#fefefe",
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