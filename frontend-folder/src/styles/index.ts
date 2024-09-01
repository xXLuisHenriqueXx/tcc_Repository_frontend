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
        catLoadingGif: require("../assets/cat_loading.gif")
    }
};

export const lightTheme: DefaultTheme = {
    colors: {
        text: "#110f1f",
        textInactive: "#110f1f80",
        highlightColor: "#6E53B4",
        highlightColorInactive: "#6E53B480",
        bgMainColor: ["#ffffff","#CABEE9"],
        bgColor: "#fefefe", 
        bdColor: "#6E53B426",
        bgContainerColorActive: "#CABEE9bf",
        bgContainerColorInactive: "#CABEE940",
        fadeBgColor: "#000000e6",
        bgModal: "#fefefe",
        bgBottomTab: "#fefefe",
        tintActiveColor: '#6E53B4',
        tintInactiveColor: '#110f1f99',
        trackColorInactive: "#110f1f",
        trackColorActive: "#6E53B4",
        thumbColor: "#ffffff",
        white: "#ffffff",
    },
    images: {
        bgButton: require("../assets/bgButton_light.png"),
        catImage: require("../assets/cute_cat.png"),
        catLoadingGif: require("../assets/cat_loading.gif")
    }
};