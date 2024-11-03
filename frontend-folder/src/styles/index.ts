import { DefaultTheme } from "styled-components/native";

export const darkTheme: DefaultTheme =  {
    colors: {
        text: "#EDEDED",
        textInactive: "#EDEDED80",
        highlightColor: "#93FC9D",
        highlightColorInactive: "#93FC9D80",
        bgMainColor: ["#231F35","#060624"],
        bgColor: "#13122C", 
        bdColor: "#93FC9D26",
        bgContainerColorActive: "#706F83bf",
        bgContainerColorInactive: "#706F8340",
        fadeBgColor: "#0E0E21E6",
        bgModal: "#13122C",
        bgBottomTab: "#13122C",
        tintActiveColor: '#93FC9D',
        tintInactiveColor: '#79769A99',
        trackColorInactive: "#474663",
        trackColorActive: "#93FC9D",
        thumbColor: "#EDEDED",
        white: "#FFFFFF",
    },
    images: {
        bgButton: require("../assets/dark/bgButton_dark.png"),
        catLoadingGif: require("../assets/common/cat_loading.gif")
    }
};

export const lightTheme: DefaultTheme = {
    colors: {
        text: "#110F1F",
        textInactive: "#110F1F80",
        highlightColor: "#6E53B4",
        highlightColorInactive: "#6E53B480",
        bgMainColor: ["#FFFFFF","#E8E2F8"],
        bgColor: "#E8E2F8", 
        bdColor: "#6E53B426",
        bgContainerColorActive: "#FEFEFEbf",
        bgContainerColorInactive: "#FEFEFE40",
        fadeBgColor: "#000000E6",
        bgModal: "#FEFEFE",
        bgBottomTab: "#FEFEFE",
        tintActiveColor: '#6E53B4',
        tintInactiveColor: '#110F1F99',
        trackColorInactive: "#110F1F",
        trackColorActive: "#6E53B4",
        thumbColor: "#FEFEFE",
        white: "#FEFEFE",
    },
    images: {
        bgButton: require("../assets/light/bgButton_light.png"),
        catLoadingGif: require("../assets/common/cat_loading.gif")
    }
};