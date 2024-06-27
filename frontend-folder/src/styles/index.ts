import { DefaultTheme } from "styled-components/native";

export const darkTheme: DefaultTheme =  {
    colors: {
        text: "#FFFFFF",
        textInactive: "#FFFFFF50",
        textAlternative: "#252345",
        highlightColor: "#06F674",
        bgColor: ["#020523", "#0F1659"], 
        bdColor: "#0038FF30",
        bgContainerColorActive: "#433F6A50",
        bgContainerColorInactive: "#433F6A20",
        fadeBgColor: "#00000090",
        bgBottomTab: "#08041B",
        tintActiveColor: '#06F674',
        tintInactiveColor: '#79769A70',
        trackColorInactive: "#363362",
        trackColorActive: "#06F674",
        thumbColorActive: "#FFFFFF",
        thumbColorInactive: "#F4F3F4",
        white: "#FFFFFF",
    },
    images: {
        bgMain: require("../../assets/bgDark_mainPages.jpg"),
        bgSecondary: require("../../assets/bgDark_secondaryPages.jpg"),
        bgModalDelete: require("../../assets/bgDark_ModalDelete.png"),
        catImage: require("../../assets/cute_cat.png"),

    }
};

export const lightTheme: DefaultTheme = {
    colors: {
        text: "#222328",
        textInactive: "#22232850",
        textAlternative: "#FFFFFF",
        highlightColor: "#F87433",
        bgColor: "#EAFBFE", 
        bdColor: "#298A9150",
        bgContainerColorActive: "#C3E2E750",
        bgContainerColorInactive: "#C3E2E720",
        fadeBgColor: "#00000090",
        bgBottomTab: "#CFEEF2",
        tintActiveColor: '#136670',
        tintInactiveColor: '#33354050',
        trackColorInactive: "#110F1F",
        trackColorActive: "#F87433",
        thumbColorActive: "#FFFFFF",
        thumbColorInactive: "#F4F3F4",
        white: "#FFFFFF",
    },
    images: {
        bgMain: require("../../assets/bgLight_mainPages.jpg"),
        bgSecondary: require("../../assets/bgLight_secondaryPages.jpg"),
        catImage: require("../../assets/cute_cat.png")
    }
};