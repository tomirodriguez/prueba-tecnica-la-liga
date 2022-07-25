import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';

import { ColorModeScript } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { setupStore } from './redux';
import reportWebVitals from './reportWebVitals';
import './styles/global.css';
import { theme } from './themes/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <ChakraProvider theme={theme} resetCSS>
      <Provider store={setupStore()}>
        <BrowserRouter>
          <ColorModeScript initialColorMode={theme.initialColorMode} />
          <App />
        </BrowserRouter>
      </Provider>
    </ChakraProvider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
