import { createTheme } from "@material-ui/core";
import { ThemeOptions } from "@material-ui/core";
import { ColorPartial } from "@material-ui/core/styles/createPalette";
import font from 'styles/abstracts/_font.module.scss'
import breakpoints from 'styles/abstracts/_breakpoints.module.scss'
// import colors from 'styles/abstracts/_colors.module.scss'

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
      danger: ColorPartial;
      blue: ColorPartial;
      myGrey: ColorPartial;
      white: ColorPartial;
  }
  interface PaletteOptions {
    danger: ColorPartial;
    blue: ColorPartial;
    myGrey: ColorPartial;
    white: ColorPartial;
  }
}

declare module "@material-ui/core/styles/createPalette" {
  interface PaletteColor extends ColorPartial {}
}

const themeOptions: ThemeOptions = {
    palette: {
      primary: {
        100: '#badad3',
        200: '#92c2b7',
        300: '#5c9889',
        400: '#87BBAD',
        main: '#6FAA9C',
        600: '#4c8777',
        700: '#3f6b5e',
        800: '#385c50',
        900: '#2a4137',
        contrastText: "#fff" //button text white instead of black

      },
      secondary: {
        100: '#d5d1cf',
        200: '#bbb2ac',
        300: '#a19387',
        400: '#8e7a6b',
        main: '#7a634f',
        600: '#6e5948',
        700: '#5f4c3e',
        800: '#514035',
        900: '#413229'
      },
      danger: {
        100: '#f6c1b9',
        200: '#d99f98',
        300: '#bb7c74',
        400: '#a6615a',
        500: '#8f4740',
        600: '#833e39',
        700: '#723230',
        800: '#622628',
        900: '#51181f'
      },
      blue: {
        100: '#c2cce2',
        200: '#9babcf',
        300: '#748abb',
        400: '#5570ae',
        500: '#3458a1',
        600: '#2d5098',
        700: '#23478c',
        800: '#1c3d80',
        900: '#102c69'
      },
      warning: {
        100: '#edebc5',
        200: '#e0dfa0',
        300: '#d3d279',
        400: '#c8c95b',
        500: '#bdc03d',
        600: '#abb035',
        700: '#949d2a',
        800: '#7e8a22',
        900: '#596910'
      },
      myGrey: {
        50: '#f9f9f9',
        100: '#dbdbdb',
        200: '#c9c9c9',
        300: '#b7b7b7',
        400: '#a5a5a5',
        500: '#929292',
        600: '#808080',
        700: '#6e6e6e',
        800: '#5c5c5c',
        900: '#4a4a4a'
      },
      white: {
        100: "#fff"
      }
    },
    spacing: 8,
    typography: {
      fontFamily: `'Poppins'`
    },
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
