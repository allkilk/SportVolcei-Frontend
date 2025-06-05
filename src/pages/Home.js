import React from 'react';
import { Box, Heading, Text, Center, Button, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <Center h="calc(100vh - 120px)" flexDirection="column" p={4}>
      <Box textAlign="center">
        <Heading as="h1" size="2xl" mb={4}>
          Benvenuto su SportVolcei
        </Heading>
        <Text fontSize="xl" mb={6}>
          Il tuo portale per prenotare campi sportivi a Contursi Terme!
        </Text>
        {!isAuthenticated && (
          <VStack spacing={4}>
            <Button as={RouterLink} to="/register" colorScheme="blue" size="lg">
              Registrati Ora
            </Button>
            <Text>Hai già un account? <RouterLink to="/login">Accedi</RouterLink></Text>
          </VStack>
        )}
      </Box>
    </Center>
  );
}

export default Home;