import { extendTheme } from '@chakra-ui/react';

export const lightTheme = extendTheme({
  colors: {
    bg: '#eeeeee',
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
});
