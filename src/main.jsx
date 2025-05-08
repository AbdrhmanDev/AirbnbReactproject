import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './services/Store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './services/Slice/AuthContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider 
    clientId="504806254173-8l8ivmv8ukg0uj8uqjo76g72jtmn75nb.apps.googleusercontent.com">
    <Provider store={store}>
      <AuthProvider>
    <App />
      </AuthProvider>
      
    </Provider>
  </GoogleOAuthProvider>
  </StrictMode>,
)
