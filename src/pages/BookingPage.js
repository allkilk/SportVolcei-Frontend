import React from 'react';
import { Box, Heading, Text, Center } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

function BookingPage() {
  const { fieldId } = useParams(); // Prende l'ID del campo dall'URL

  return (
    <Center h="calc(100vh - 120px)" flexDirection="column" p={4}>
      <Box textAlign="center">
        <Heading as="h1" size="2xl" mb={4}>
          Pagina di Prenotazione
        </Heading>
        <Text fontSize="xl">
          Stai per prenotare il campo con ID: {fieldId || 'Nessun ID campo specificato'}
        </Text>
        <Text mt={4}>
          Qui verranno visualizzate le opzioni di prenotazione.
        </Text>
      </Box>
    </Center>
  );
}

export default BookingPage;