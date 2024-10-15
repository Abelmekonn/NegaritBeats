import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App.jsx'
import store from '../redux/store.js';
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { CustomThemeProvider } from './components/customThemeProvide.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <CustomThemeProvider>
          <App />
        </CustomThemeProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
