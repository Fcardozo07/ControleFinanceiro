import React from 'react';
import ReactDOM from 'react-dom/client';

import {App} from './App';
import { FotoUsuarioProvider } from './shared/contexts/FotoUsuarioContext';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <FotoUsuarioProvider>
    <App />
  </FotoUsuarioProvider>
);
