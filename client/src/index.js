import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import AuthProvider from './Context/AuthContext'


ReactDOM.render(
 
    <AuthProvider>
    <App />
    </AuthProvider>,
 
  document.getElementById('root')
);
