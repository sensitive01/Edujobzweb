import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/bootstrap.css';
import './assets/css/all.css';
import './assets/css/all.min.css';
import './assets/css/main.css';
import './assets/css/theme-color.css';
// import './assets/css/brands.css';
// import './assets/css/brands.min.css';
// import './assets/css/fontawesome.css';
// import './assets/css/fontawesome.min.css';
import './assets/css/global.css';
import './assets/css/jobplugin.css';
// import './assets/css/regular.css';
// import './assets/css/regular.min.css';
// import './assets/css/solid.css';
// import './assets/css/solid.min.css';
// import './assets/css/svg-with-js.css';
// import './assets/css/svg-with-js.min.css';
// import './assets/css/v4-font-face.css';
// import './assets/css/v4-font-face.min.css';
// import './assets/css/v4-shims.css';
// import './assets/css/v4-shims.min.css';
// import './assets/css/v5-font-face.css';
// import './assets/css/v5-font-face.min.css';
import './assets/css/vendors.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
