import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Box, Spinner, Center, Text } from '@chakra-ui/react'; // Importa i componenti Chakra UI per il caricamento

const PrivateRoute = ({ allowedRoles }) => {
    const { user, isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <Center h="100vh">
                <Box textAlign="center">
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    />
                    <Text mt={4}>Caricamento...</Text>
                </Box>
            </Center>
        );
    }

    if (!isAuthenticated) {
        // Se non autenticato, reindirizza alla pagina di login
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        // Se l'utente non ha il ruolo permesso, reindirizza alla dashboard o a una pagina di accesso negato
        return <Navigate to="/dashboard" replace />; // O una pagina "Accesso Negato"
    }

    // Se autenticato e ha il ruolo giusto, renderizza il componente figlio
    return <Outlet />;
};

export default PrivateRoute;