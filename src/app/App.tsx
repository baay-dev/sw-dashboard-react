import {Outlet} from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Outlet/>
    </ThemeProvider>
  )
}

export default App
