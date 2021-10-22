import { createTheme } from "@material-ui/core";
import { ThemeOptions } from "@material-ui/core";


const themeOptions: ThemeOptions = {
    palette: {
      type: 'light',
      primary: {
        main: '#004d40',
      },
      secondary: {
        // light: "#e6e3d8",
        main: '#f0e6bd',
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
