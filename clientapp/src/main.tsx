import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProvider } from './context/AppContext.tsx';
import App from './App.tsx';
import AOS from 'aos';
import './index.css';
import 'aos/dist/aos.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppProvider>
            <App />
        </AppProvider>
    </StrictMode>
);

AOS.init();
