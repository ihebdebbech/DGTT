import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import  KeycloakProvider  from './pages/KeycloakProvider';
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <KeycloakProvider>
  <React.StrictMode>

    <App />
   
  </React.StrictMode>
  </KeycloakProvider>
);
defineCustomElements(window);