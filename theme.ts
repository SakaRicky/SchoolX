import { createTheme } from "@material-ui/core";
import { ThemeOptions } from "@material-ui/core";

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
      grayYellow: Palette['primary'];
  }
  interface PaletteOptions {
    grayYellow: PaletteOptions['primary'];
  }
}

const themeOptions: ThemeOptions = {
    palette: {
      type: 'light',
      primary: {
        main: '#004d40',
      },
      secondary: {
        main: '#f0e6bd',
      },
      warning: {
        main: '#fb8c00',
      },
      grayYellow: {
        main: "#e6e3d8",
      }
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
