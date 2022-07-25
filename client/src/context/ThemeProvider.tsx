import { FC, PropsWithChildren, useState, useEffect } from 'react';
import { ThemeContext } from './';

export const ThemeProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const theme = window.localStorage.getItem('theme');

    if (theme === 'dark') setIsDarkMode(true);
  }, []);

  const toggleDarkMode = () => {
    const willBeDarkMode = !isDarkMode;
    setIsDarkMode(willBeDarkMode);
    window.localStorage.setItem('theme', willBeDarkMode ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
