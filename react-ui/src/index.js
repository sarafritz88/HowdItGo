import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { StripeProvider } from 'react-stripe-elements';

ReactDOM.render(
  <StripeProvider apiKey="pk_test_uxOIB8dubYVMvlhQo9xYpBxm">
    <App />
  </StripeProvider>,
  document.getElementById('root')
);
registerServiceWorker();
