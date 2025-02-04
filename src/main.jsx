// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ShopContextProvider from './context/ShopContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; // Optional, for development

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShopContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        {/* Optional: Add ReactQueryDevtools for development */}
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </ShopContextProvider>
  </BrowserRouter>
);
