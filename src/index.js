import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import 'tw-elements';

const queryClient = new QueryClient()
const stripePromise = loadStripe('pk_test_51L1tk9Hl8mJ3Qhh07bjmxqo4qYdRo6DXZwPtfZ2jDKLP8RZlig2atCz2gKEXHigXAujYmHnpEGwBMBAFTSkKIN3x00kTbLpqnZ');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </QueryClientProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
