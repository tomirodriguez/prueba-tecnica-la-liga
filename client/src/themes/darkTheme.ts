import { extendTheme } from '@chakra-ui/react';

export const darkTheme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: true,
  colors: {
    bg: {
      main: '#121212',
      card: '#242424',
    },
    primary: {
      main: '#f44336',
      light: '#ff7961',
      dark: '#ba000d',
    },
    secondary: {
      main: '#1976d2',
      light: '#1976d2',
      dark: '#004ba0',
    },
    brand: {
      100: '#f7fafc',
      900: '#1a202c',
    },
  },
  styles: {
    global: {
      body: {
        color: 'white',
        backgroundColor: '#121212',
      },
    },
  },
});
