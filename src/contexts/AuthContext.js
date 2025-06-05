import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

// ** SOSTITUISCI QUESTO CON L'URL ESATTO DEL TUO BACKEND SU RENDER.COM **
// Esempio: 'https://sportvolcei-backend-tuonome.onrender.com'
const API = axios.create({
  baseURL: 'YOUR_BACKEND_RENDER_URL_HERE' 
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Funzione per caricare i dati dell'utente dal localStorage e verificare il token
  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      // Imposta il token nell'header di Axios per tutte le richieste future
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        // Opzionale: verificare il token con un endpoint del backend (es. /api/auth/me)
        // Per ora, assumiamo che se il token esiste, l'utente è autenticato.
        // In un'app reale, si farebbe una chiamata al backend per validare il token.
        const res = await API.get('/api/users/me'); // Endpoint per ottenere i dati dell'utente autenticato
        setUser(res.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Errore nel caricamento utente o token invalido:", error);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const register = async (userData) => {
    try {
      const res = await API.post('/api/auth/register', userData);
      // Non logghiamo automaticamente dopo la registrazione, l'utente deve fare il login
      return res.data;
    } catch (error) {
      console.error("Errore di registrazione:", error.response?.data?.message || error.message);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const res = await API.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      API.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setIsAuthenticated(true);
      setUser(res.data.user); // Assumendo che il backend restituisca i dati dell'utente al login
      return res.data;
    } catch (error) {
      console.error("Errore di login:", error.response?.data?.message || error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete API.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login'); // Reindirizza alla pagina di login dopo il logout
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};