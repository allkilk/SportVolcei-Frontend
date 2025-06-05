import React from 'react';
import { Box, Heading, Text, Center, VStack } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';

function Profile() {
  const { user } = useAuth(); // Ottieni i dati dell'utente dal contesto

  if (!user) {
    return (
      <Center h="calc(100vh - 120px)">
        <Text>Caricamento profilo...</Text>
      </Center>
    );
  }

  return (
    <Center h="calc(100vh - 120px)" flexDirection="column" p={4}>
      <Box textAlign="center">
        <Heading as="h1" size="2xl" mb={4}>
          Il tuo Profilo
        </Heading>
        <VStack spacing={4}>
          <Text fontSize="xl">Nome: {user.firstName || 'N/A'}</Text>
          <Text fontSize="xl">Cognome: {user.lastName || 'N/A'}</Text>
          <Text fontSize="xl">Email: {user.email}</Text>
          <Text fontSize="lg">Ruolo: {user.role}</Text>
          {/* Aggiungi qui altri dettagli del profilo come telefono, ecc. */}
        </VStack>
      </Box>
    </Center>
  );
}

export default Profile;