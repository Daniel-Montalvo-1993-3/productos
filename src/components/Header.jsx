
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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
          <AppBar position="fixed" color="primary" enableColorOnDark>
            <Toolbar>
              <Box
                component="img"
                sx={{
                  height: 'auto',
                  width: '100%',
                  maxWidth: 100,
                  borderRadius: 0,
                  margin: '0 10px -15px 0',
                }}
                alt="Inicio"
                src="https://unite.pokemon.com/images/footer/snorlax.png"
              />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                INICIO
              </Typography>
              <Button color="secondary">Formulario</Button>
            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>
      <img alt="pokemon" className="headerImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/800px-International_Pok%C3%A9mon_logo.svg.png" />
    </>
  )
}

export default Header;
