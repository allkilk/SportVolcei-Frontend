import React, { useState } from 'react';
import { Box, Heading, Input, Button, FormControl, FormLabel, VStack, Alert, AlertIcon, Link as ChakraLink, Text } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard'); // Reindirizza alla dashboard dopo il login
    } catch (err) {
      setError(err.response?.data?.message || 'Errore durante il login. Controlla le credenziali.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading as="h2" size="xl" textAlign="center" mb={6}>Login</Heading>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" size="lg" width="full" isLoading={isLoading}>
            Accedi
          </Button>
        </VStack>
      </form>
      <Text mt={4} textAlign="center">
        Non hai un account? <ChakraLink as={RouterLink} to="/register" color="blue.500">Registrati qui</ChakraLink>
      </Text>
    </Box>
  );
}

export default Login;