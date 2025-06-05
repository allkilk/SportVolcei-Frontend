import React from 'react';
import { Box, Flex, Text, Button, Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <Box bg="blue.500" px={4} py={2} color="white">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <ChakraLink as={RouterLink} to="/">
          <Text fontSize="xl" fontWeight="bold">SportVolcei</Text>
        </ChakraLink>
        <Flex alignItems="center">
          {isAuthenticated ? (
            <>
              <ChakraLink as={RouterLink} to="/dashboard" px={2}>Dashboard</ChakraLink>
              {user && user.role === 'admin' && (
                <ChakraLink as={RouterLink} to="/admin" px={2}>Admin</ChakraLink>
              )}
              <ChakraLink as={RouterLink} to="/profile" px={2}>Profilo</ChakraLink>
              <Button onClick={logout} ml={4} colorScheme="red" size="sm">Logout</Button>
            </>
          ) : (
            <>
              <ChakraLink as={RouterLink} to="/login" px={2}>Login</ChakraLink>
              <ChakraLink as={RouterLink} to="/register" px={2}>Registrati</ChakraLink>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar;