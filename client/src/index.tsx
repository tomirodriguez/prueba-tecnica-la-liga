import { ChakraProvider } from '@chakra-ui/react';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { ThemeContext, ThemeProvider } from './context';
import { setupStore } from './redux';
import reportWebVitals from './reportWebVitals';
import './styles/global.css';
import { darkTheme } from './themes/darkTheme';
import { lightTheme } from './themes/lightTheme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
  <ThemeProvider>
    <ThemeContext.Consumer>
      {(value) => (
        <ChakraProvider
          theme={value.isDarkMode ? darkTheme : lightTheme}
          resetCSS
        >
          <Provider store={setupStore()}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Provider>
        </ChakraProvider>
      )}
    </ThemeContext.Consumer>
  </ThemeProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
