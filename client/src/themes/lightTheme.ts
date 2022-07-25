import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

export const lightTheme: ThemeConfig = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
  colors: {
    bg: {
      main: '#eeeeee',
      card: '#ffffff',
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
        color: '#1A202C',
        backgroundColor: '#eeeeee',
      },
    },
  },
});
