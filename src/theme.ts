import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Change this to your primary color
    },
    secondary: {
      main: '#d32f2f', // Change this to your secondary color
    },
  },
  typography: {
    button: {
      textTransform: 'none', // Prevents all buttons from being uppercase
    },
  },
});

export default theme;
