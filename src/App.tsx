import { ThemeProvider } from "styled-components";
import ImplemetationRoutes from "./Routes";
import { GlobalStyles, customTheme } from "./Theme";
import { useEffect } from "react";
import { VERSION } from "./Constants";
import IsLoading from "./Components/Common/Utils/IsLoading";
import Toastify from "./Components/Common/Core/Toastify";
import { closeSnackbar } from "./store/Actions/Root";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/interfaces";

const App = () => {
  const theme = customTheme();
  const dispatch = useDispatch();
  const { toastify } = useSelector((state: RootState) => state?.root);

  useEffect(() => {
    // ASCII art and styles for the console message
    const asciiArt = `
          %c
      ██▀███  ▄▄▄    ▓██   ██▓    ▄████▄  ██▓    ▒█████  █    ██▓█████▄ 
      ▓██ ▒ ██▒████▄   ▒██  ██▒   ▒██▀ ▀█ ▓██▒   ▒██▒  ██▒██  ▓██▒██▀ ██▌
      ▓██ ░▄█ ▒██  ▀█▄  ▒██ ██░   ▒▓█    ▄▒██░   ▒██░  ██▓██  ▒██░██   █▌
      ▒██▀▀█▄ ░██▄▄▄▄██ ░ ▐██▓░   ▒▓▓▄ ▄██▒██░   ▒██   ██▓▓█  ░██░▓█▄   ▌
      ░██▓ ▒██▒▓█   ▓██▒░ ██▒▓░   ▒ ▓███▀ ░██████░ ████▓▒▒▒█████▓░▒████▓ 
      ░ ▒▓ ░▒▓░▒▒   ▓▒█░ ██▒▒▒    ░ ░▒ ▒  ░ ▒░▓  ░ ▒░▒░▒░░▒▓▒ ▒ ▒ ▒▒▓  ▒ 
        ░▒ ░ ▒░ ▒   ▒▒ ▓██ ░▒░      ░  ▒  ░ ░ ▒  ░ ░ ▒ ▒░░░▒░ ░ ░ ░ ▒  ▒ 
        ░░   ░  ░   ▒  ▒ ▒ ░░     ░         ░ ░  ░ ░ ░ ▒  ░░░ ░ ░ ░ ░  ░ 
        ░          ░  ░ ░        ░ ░         ░  ░   ░ ░    ░       ░    
                      ░ ░        ░                               ░      
          `;
    const style = `
      font-family: monospace;
      font-size: 12px;
      color: #ee6a05    
    `;
    console.log(asciiArt, style);
    console.log(VERSION);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ImplemetationRoutes />
      <IsLoading />
      <Toastify
        open={toastify.open}
        message={toastify.message}
        type={toastify.type}
        duration={toastify.duration}
        onClose={() => dispatch(closeSnackbar())}
      />
    </ThemeProvider>
  );
};

export default App;
