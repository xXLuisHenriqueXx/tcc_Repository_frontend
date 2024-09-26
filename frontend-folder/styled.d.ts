import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        
    colors: {
        text: string;
        textInactive: string;
        highlightColor: string;
        highlightColorInactive: string;
        bgMainColor: string[];
        bgColor: string; 
        bdColor: string;
        bgContainerColorActive: string;
        bgContainerColorInactive: string;
        fadeBgColor: string;
        bgModal: string;
        bgBottomTab: string;
        tintActiveColor: string;
        tintInactiveColor: string;
        trackColorInactive: string;
        trackColorActive: string;
        thumbColor: string;
        white: string;
    },
    images: {
        bgButton: any;
        catLoadingGif: any;
    }
    }
}