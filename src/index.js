import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import b2cauth from 'react-azure-adb2c';
import Dashboard from './Dashboard';
import App from './app'

b2cauth.initialize({
    instance: 'https://login.microsoftonline.com/tfp/', 
    tenant: 'pbisites.onmicrosoft.com',
    signInPolicy: 'B2C_1_SignUp_SignIn',
    applicationId: '6908540a-bbe1-4381-b9a5-76f01658f0a7',
    cacheLocation: 'sessionStorage',
    scopes: ['https://pbisites.onmicrosoft.com/api/user_impersonation'],
    redirectUri: 'http://localhost:3000',
    postLogoutRedirectUri: window.location.origin,
  });

b2cauth.run(() => {
  ReactDOM.render(<App />, document.getElementById('root'));
  serviceWorker.unregister();
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
