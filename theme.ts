import { createTheme } from "@material-ui/core";
import { ThemeOptions } from "@material-ui/core";


const themeOptions: ThemeOptions = {
    palette: {
      type: 'light',
      primary: {
        main: '#004d40',
      },
      secondary: {
        main: '#c3a51f',
      },
      warning: {
        main: '#fb8c00',
      },
    },
    spacing: 8,
    props: {
      MuiButtonBase: {
        disableRipple: true,
      },
    },
    overrides: {
        MuiButton: {
            root: {
                textTransform: 'none'
            }
        }
    }
};

export const theme = createTheme(themeOptions);

// declare module '@mui/material/styles' {
//     interface Theme {
//         status: {
//         danger: string;
//         };
//     }
//     // allow configuration using `createTheme`
//     interface ThemeOptions {
//         status?: {
//         danger?: string;
//         };
//     }
// }