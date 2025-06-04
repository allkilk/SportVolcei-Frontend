import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode'; // Assicurati di aver installato jwt-decode: npm install jwt-decode
import api from '../services/api'; // useremo questo per le chiamate API

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserFromToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    // Verifica se il token è scaduto
                    if (decodedToken.exp * 1000 < Date.now()) {
                        console.log('Token scaduto, logout automatico');
                        localStorage.removeItem('token');
                        setUser(null);
                    } else {
                        // Carica i dati utente completi dal backend se necessario,
                        // o usa solo i dati dal token per ora.
                        // Per completezza, potresti voler fare una chiamata /api/users/me qui
                        // per ottenere i dati utente più aggiornati e robusti.
                        setUser({
                            id: decodedToken.id,
                            email: decodedToken.email,
                            role: decodedToken.role
                        });
                    }
                } catch (error) {
                    console.error('Errore decodifica token:', error);
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setLoading(false);
        };

        loadUserFromToken();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
            const decodedToken = jwtDecode(token);
            setUser({
                id: decodedToken.id,
                email: decodedToken.email,
                role: decodedToken.role
            });
            return true; // Login riuscito
        } catch (error) {
            console.error('Errore di login:', error.response?.data?.message || error.message);
            // Puoi gestire errori specifici (es. credenziali non valide) qui
            throw error; // Rilancia l'errore per la gestione nel componente login
        }
    };

    const register = async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            // Dopo la registrazione, puoi scegliere di loggare l'utente automaticamente
            // o reindirizzarlo alla pagina di login. Per ora, non lo logghiamo automaticamente.
            return response.data; // Ritorna i dati di successo della registrazione
        } catch (error) {
            console.error('Errore di registrazione:', error.response?.data?.message || error.message);
            throw error; // Rilancia l'errore
        }
    };


    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve essere usato all\'interno di un AuthProvider');
    }
    return context;
};