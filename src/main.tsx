import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App.tsx";

import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fontsource-variable/nunito';
import 'react-lazy-load-image-component/src/effects/opacity.css';

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
