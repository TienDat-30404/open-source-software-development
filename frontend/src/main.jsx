import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AudioPlayerProvider } from './hooks/useAudioPlayer.jsx';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
      <AudioPlayerProvider>
        <App />
      </AudioPlayerProvider>
    </QueryClientProvider>
)
