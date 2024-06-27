import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        colors: {
            text: string;
            textInactive: string;
            textAlternative: string;
            highlightColor: string;
            bgColor: string | string[];
            bdColor: string;
            bgContainerColorActive: string;
            bgContainerColorInactive: string;
            fadeBgColor: string;
            bgBottomTab: string;
            tintActiveColor: string;
            tintInactiveColor: string;
            trackColorInactive: string;
            trackColorActive: string;
            thumbColorActive: string;
            thumbColorInactive: string;
            white: string;
        },
        images: {
            bgMain: any;
            bgSecondary: any;
            catImage: any;
        }
    }
}