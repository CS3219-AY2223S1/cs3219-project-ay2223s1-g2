import { ThemeProvider, createTheme } from '@mui/material/styles';

export const toggleButtonCardTheme = createTheme({
    palette: {
        background: {
        paper: '#fff',
        },
        standard: {
        normal: '0073FF'
        },
        text: {
            primary: '#173A5E',
            secondary: '#46505A',
        },
        button: {
            active: '#001E3C',
        }
    },
  });