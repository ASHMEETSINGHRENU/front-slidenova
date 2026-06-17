// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './styles/globals.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// // Import Font Awesome
// const fontAwesomeLink = document.createElement('link');
// fontAwesomeLink.rel = 'stylesheet';
// fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
// document.head.appendChild(fontAwesomeLink);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// reportWebVitals();




import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Import Font Awesome
const fontAwesomeLink = document.createElement('link');
fontAwesomeLink.rel = 'stylesheet';
fontAwesomeLink.href =
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
document.head.appendChild(fontAwesomeLink);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
    >
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();