// import 'bootstrap/dist/css/bootstrap.min.css';
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'




// import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom'

// // createRoot(document.getElementById('root')).render(
// //   <BrowserRouter>
// //     <App />
// //   </BrowserRouter>
// // )
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </StrictMode>
// );

import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
