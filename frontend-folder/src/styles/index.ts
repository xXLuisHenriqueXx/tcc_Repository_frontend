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

// export const lightTheme: DefaultTheme = {
//     colors: {
//         text: "#222328",
//         textInactive: "#22232850",
//         textAlternative: "#FFFFFF",
//         highlightColor: "#F87433",
//         bgColor: "#EAFBFE", 
//         bdColor: "#298A9150",
//         bgContainerColorActive: "#C3E2E750",
//         bgContainerColorInactive: "#C3E2E720",
//         fadeBgColor: "#00000090",
//         bgBottomTab: "#CFEEF2",
//         tintActiveColor: '#136670',
//         tintInactiveColor: '#33354050',
//         trackColorInactive: "#110F1F",
//         trackColorActive: "#F87433",
//         thumbColorActive: "#FFFFFF",
//         thumbColorInactive: "#F4F3F4",
//         white: "#FFFFFF",
//     },
//     images: {
//         bgMain: require("../assets/bgLight_mainPages.jpg"),
//         bgSecondary: require("../assets/bgLight_secondaryPages.jpg"),
//         catImage: require("../assets/cute_cat.png")
//     }
// };