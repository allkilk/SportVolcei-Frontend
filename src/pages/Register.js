import React, { useState } from 'react';
import { Box, Heading, Input, Button, FormControl, FormLabel, VStack, Alert, AlertIcon, Link as ChakraLink, Text } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Le password non corrispondono.');
      setIsLoading(false);
      return;
    }

    try {
      await register(formData);
      setSuccess('Registrazione avvenuta con successo! Puoi accedere ora.');
      // Opzionale: reindirizzare dopo un breve ritardo
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Errore durante la registrazione.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading as="h2" size="xl" textAlign="center" mb={6}>Registrati</Heading>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      {success && (
        <Alert status="success" mb={4}>
          <AlertIcon />
          {success}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="firstName">
            <FormLabel>Nome</FormLabel>
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="lastName">
            <FormLabel>Cognome</FormLabel>
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="confirmPassword">
            <FormLabel>Conferma Password</FormLabel>
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" size="lg" width="full" isLoading={isLoading}>
            Registrati
          </Button>
        </VStack>
      </form>
      <Text mt={4} textAlign="center">
        Hai già un account? <ChakraLink as={RouterLink} to="/login" color="blue.500">Accedi qui</ChakraLink>
      </Text>
    </Box>
  );
}

export default Register;