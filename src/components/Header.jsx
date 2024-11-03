
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const theme = createTheme({
  palette: {
    primary: {
      main: '#673ab7',
    },
    secondary: {
      main: '#fff',
    },
  },
});

const Header = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" color="primary" enableColorOnDark>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                INICIO
              </Typography>
              <Button color="secondary">Formulario</Button>
            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>
    </>
  )
}

export default Header;
