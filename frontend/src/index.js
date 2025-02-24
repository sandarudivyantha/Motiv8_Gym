import React from 'react';
import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import { ThemeProvider } from '@mui/material/styles';
// import { store } from './app/store';
import App from './App';
// import { theme } from './theme';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Provider store={store}>
      <ThemeProvider theme={theme}> */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      {/* </ThemeProvider>
    </Provider> */}
  </React.StrictMode>
);