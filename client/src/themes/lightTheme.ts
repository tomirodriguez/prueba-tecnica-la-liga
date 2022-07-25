import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

export const lightTheme: ThemeConfig = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: true,
  colors: {
    dark: {
      primary: {
        main: '#f44336',
        light: '#ff7961',
        dark: '#ba000d',
      },
      bg: {
        main: '#121212',
        card: '#242424',
      },
      secondary: {
        main: '#1976d2',
        light: '#1976d2',
        dark: '#004ba0',
      },
    },
    light: {
      primary: {
        main: '#f44336',
        light: '#ff7961',
        dark: '#ba000d',
      },
      bg: {
        main: '#eeeeee',
        card: '#ffffff',
      },
      secondary: {
        main: '#1976d2',
        light: '#1976d2',
        dark: '#004ba0',
      },
    },
  },
});
