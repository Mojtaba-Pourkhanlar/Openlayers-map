import { ThemeProvider } from "styled-components";
import ImplemetationRoutes from "./Routes";
import { GlobalStyles, customTheme } from "./Theme";

const App = () => {
  const theme = customTheme();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ImplemetationRoutes />
    </ThemeProvider>
  );
};

export default App;
