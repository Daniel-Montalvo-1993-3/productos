
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

// Creacion de paleta para el header
const theme = createTheme({
  palette: {
    primary: {
      main: '#b71c1c',
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
          <AppBar position="fixed" color="primary" enableColorOnDark sx={{ boxShadow: "none" }}>
            <Toolbar>
              <Box
                component="img"
                sx={{
                  width: '100',
                  height: '49',
                  maxWidth: 100,
                  borderRadius: 0,
                  margin: '0 10px -15px 0',
                }}
                alt="Inicio"
                src="/images/snorlax.webp"
              />
              <Link style={{ width: '100%', color: 'white', textDecoration: 'none' }} to={`/`} >
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  INICIO
                </Typography>
              </Link>
              <Link style={{ color: 'white', textDecoration: 'none' }} to={`/formulario`} >
                <Button color="secondary">Formulario</Button>
              </Link>
            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>
      <img width="300" height="110" alt="pokemon" className="headerImage" src="/images/logo.webp" />
    </>
  )
}

export default Header;
