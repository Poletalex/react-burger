import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import './index.css';
import { rootReducer } from './services/reducers';
import { Provider } from 'react-redux';
import { BrowserRouter as Router} from 'react-router-dom';

const store = configureStore({
  reducer: rootReducer
});

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
