import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './index.css'
import App from './App.tsx'
import { PositionProvider } from './app/router/provider/context/Positioncontext.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <PositionProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </PositionProvider>
  </StrictMode>,
)
