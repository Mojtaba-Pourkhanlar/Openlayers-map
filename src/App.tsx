import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import Toastify from "./Components/Common/Core/Toastify";
import ImplemetationRoutes from "./Routes";
import { closeSnackbar } from "./store/Actions/Root";
import { RootState } from "./store/interfaces";
import { GlobalStyles, customTheme } from "./Theme";

const App = () => {
  const theme = customTheme();
  const dispatch = useDispatch();
  const { toastify } = useSelector((state: RootState) => state?.root);
 
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ImplemetationRoutes />
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
