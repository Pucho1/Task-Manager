import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './index.css'
import App from './App.tsx'
import { NavbarVisibilityProvider } from './features/tasks/context/NavbarVisibilityContext.tsx'

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
      <NavbarVisibilityProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </NavbarVisibilityProvider>
  </StrictMode>,
)
