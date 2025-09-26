import { createGlobalStyle } from "styled-components";

enum Breakpoints {
  xs = 320,
  sm = 768,
  md = 1024,
  lg = 1200,
  xl = 1360,
}

const theme = {
  palette: {
    primary: {
      900: "#0B233F",
      800: "#3C4F65",
      700: "#556579",
      600: "#6D7B8C",
      500: "#85919F",
      400: "#9DA7B2",
      300: "#B6BDC6",
      200: "#CED3D9",
      100: "#E7E9EC",
      50: "#F3F4F6",
    },
    secondary: {
      900: "#ACD6EC",
      800: "#B5DBEE",
      700: "#BDDEF0",
      600: "#C5E3F2",
      500: "#CDE6F4",
      400: "#D6EBF6",
      300: "#DEEFF7",
      200: "#EEF7FB",
      100: "#F7FBFE",
    },
    neutral: {
      900: "#101112",
      800: "#29292A",
      700: "#404141",
      600: "#59595A",
      500: "#707071",
      400: "#888989",
      300: "#A0A0A0",
      200: "#CFCFD0",
      100: "#E8E8E8",
      50: "#F6F6F6",
      0: "#FFF",
    },
    red: {
      dark: "#A42828",
      main: "#D34B4B",
      light: "#FBEFEF",
    },
    green: {
      dark: "#205A52",
      main: "#5AC4B4",
      light: "#F0FAF8",
    },
    yellow: {
      dark: "#FFB020",
      main: "#FFC863",
      light: "#FFF8EB",
    },
  },
  breakpoints: {
    up: (breakpoint: keyof typeof Breakpoints | number) =>
      `@media (min-width: ${
        typeof breakpoint === "string"
          ? Breakpoints[breakpoint] + 1
          : breakpoint
      }px)`,
    down: (breakpoint: keyof typeof Breakpoints | number) =>
      `@media (max-width: ${
        typeof breakpoint === "string" ? Breakpoints[breakpoint] : breakpoint
      }px)`,
  },
};

const customTheme = () => {
  const result = theme;
  return result;
};

const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: 'Vazirmatn-Regular';
  src: local('Vazirmatn-Regular'), url("../../src/assets/font/Vazirmatn-Regular.ttf") format('woff');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'Vazirmatn-Bold';
  src: local('Vazirmatn-Bold'), url("../../src/assets/font/Vazirmatn-Bold.ttf") format('woff');
  font-weight: normal;
  font-style: normal;
}

  :root {
    --font-family-main: 'Vazirmatn-Regular', sans-serif; /* Default font */
    --font-family-secondary: 'Vazirmatn-Bold', sans - serif; /* Secondary font */
  }
  
  body {
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    /* transition: background-color 0.3s ease-out, color 0.3s ease-out; */
    // direction:${(props) => props.theme.direction};
  }

`;
export type Theme = typeof theme;

export default theme;
export { GlobalStyles, customTheme };
