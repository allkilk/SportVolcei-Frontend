import React from 'react';
import { Box, Heading, Text, Center } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';

function AdminDashboard() {
  const { user } = useAuth();

  return (
    <Center h="calc(100vh - 120px)" flexDirection="column" p={4}>
      <Box textAlign="center">
        <Heading as="h1" size="2xl" mb={4}>
          Dashboard Amministratore
        </Heading>
        {user && user.role === 'admin' ? (
          <Text fontSize="xl">Benvenuto, Admin {user.email}! Qui potrai gestire utenti, campi e prenotazioni.</Text>
        ) : (
          <Text fontSize="lg">Accesso negato. Solo gli amministratori possono accedere a questa pagina.</Text>
        )}
      </Box>
    </Center>
  );
}

export default AdminDashboard;