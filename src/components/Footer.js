import React from 'react';
import { Box, Text, Flex, Link as ChakraLink } from '@chakra-ui/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <Box bg="gray.700" color="white" py={6} mt="auto">
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        maxW="1200px"
        mx="auto"
        px={4}
      >
        <Text mb={{ base: 4, md: 0 }}>
          © {new Date().getFullYear()} SportVolcei. Tutti i diritti riservati.
        </Text>
        <Flex>
          <ChakraLink href="https://github.com/allkilk/SportVolcei-Backend" isExternal mx={2}>
            <FaGithub size="24px" />
          </ChakraLink>
          <ChakraLink href="https://www.linkedin.com/in/alessio-kilk-80695029a" isExternal mx={2}>
            <FaLinkedin size="24px" />
          </ChakraLink>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Footer;