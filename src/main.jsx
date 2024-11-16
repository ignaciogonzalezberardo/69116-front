import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './styles/form.css';
import { BrowserRouter } from 'react-router-dom';
import OrderProvider from './context/OrderContex.jsx';
import { UserProvider } from './context/UserContex.jsx'; // Usa llaves para un export nombrado


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider> {/* Añade el UserProvider si es necesario */}
        <OrderProvider>
          <App />
        </OrderProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
);
