import { extendTheme, ThemeConfig } from '@chakra-ui/react';

export const theme: ThemeConfig = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: true,
  colors: {
    dark: {
      primary: {
        main: '#212121',
        light: '#484848',
        dark: '#000000',
      },
      bg: {
        main: '#121212',
        card: '#242424',
      },
      secondary: {
        main: '#5DBA85',
        light: '#66ffa6',
        dark: '#00b248',
        darker: '#2e7d32',
      },
    },
    light: {
      primary: {
        main: '#212121',
        light: '#484848',
        dark: '#000000',
      },
      bg: {
        main: '#eeeeee',
        card: '#ffffff',
      },
      secondary: {
        main: '#5DBA85',
        light: '#66ffa6',
        dark: '#00b248',
        darker: '#2e7d32',
      },
    },
  },
});
