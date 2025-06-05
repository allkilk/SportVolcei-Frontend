import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

// ********************************************************************************
// *** ATTENZIONE: DEVI SOSTITUIRE 'https://IL_TUO_URL_BACKEND_SU_RENDER.onrender.com' ***
// *** CON L'URL ESATTO DEL TUO BACKEND CHE TROVI SU RENDER.COM                     ***
// ********************************************************************************
const API = axios.create({
  baseURL: 'https://sportvolcei-backend.onrender.com/' // <-- MODIFICA QUI! INSERISCI IL TUO VERO URL!
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        const res = await API.get('/api/users/me'); 
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
      setUser(res.data.user);
      return res.data;
    } catch (error) {
      console.error("Errore di login:", error.response?.data?.message || error.message);
      throw error;
    }
  };