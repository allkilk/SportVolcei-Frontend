import React from 'react';
import { Box, Heading, Text, Center, VStack } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';

function Dashboard() {
  const { user } = useAuth(); // Ottieni i dati dell'utente dal contesto

  return (
    <Center h="calc(100vh - 120px)" flexDirection="column" p={4}>
      <Box textAlign="center">
        <Heading as="h1" size="2xl" mb={4}>
          Benvenuto sulla Dashboard!
        </Heading>
        {user ? (
          <VStack spacing={2}>
            <Text fontSize="xl">Ciao, {user.email}!</Text>
            <Text fontSize="lg">Il tuo ruolo è: {user.role}</Text>
            <Text>Qui potrai vedere le tue prenotazioni, i campi disponibili e molto altro.</Text>
          </VStack>
        ) : (
          <Text fontSize="lg">Caricamento informazioni utente...</Text>
        )}
      </Box>
    </Center>
  );
}

export default Dashboard;