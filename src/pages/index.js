import { useState } from 'react';
import Head from 'next/head';
import { Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Box } from '@chakra-ui/react';
import Pokedex from '@/containers/Pokedex';
import Inventory from '@/containers/Inventory';
import Trivia from '@/containers/Trivia';

export default function Home() {
  const [activeSection, setActiveSection] = useState('pokedex');

  return (
    <>
      <Head>
        <title>Pokemon Challenge</title>
        <meta name="description" content="Prueba tecnica Natalia Chiara, Marzo 2024" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/pokeball.png" />
      </Head>
      <Box>
        <Flex
          alignItems="center"
          minH="50px"
          width="100vw"
          backgroundColor="white"
          justifyContent="center"
          borderBottom="1px solid black"
          position="fixed"
          top="0"
          zIndex="100">
          <Breadcrumb separator="|">
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => setActiveSection('pokedex')}>Pokedex</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => setActiveSection('inventory')}>
                Inventario
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => setActiveSection('trivia')}>Trivia</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>
        {activeSection === 'pokedex' && <Pokedex />}
        {activeSection === 'inventory' && <Inventory />}
        {activeSection === 'trivia' && <Trivia />}
      </Box>
    </>
  );
}
