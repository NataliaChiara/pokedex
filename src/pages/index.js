import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Box, Text } from '@chakra-ui/react';
import axios from 'axios';
import { Inventory, Pokedex, Trivia } from '@/containers';

export default function Home() {
  const [activeSection, setActiveSection] = useState('pokedex');
  const [pokemons, setPokemons] = useState([]);
  const [itsLoading, setItsLoading] = useState(true);

  function getData() {
    axios
      .get('https://pokeapi.co/api/v2/pokemon/?limit=9999')
      .then(async ({ data }) => {
        const promises = data.results.map((result) => axios(result.url));
        // eslint-disable-next-line no-undef
        const fetchedPokemons = (await Promise.all(promises)).map((res) => res.data);
        const formattedPokemons = fetchedPokemons.map((pokemon) => {
          const { id, name, weight, height, moves } = pokemon;
          const hp = pokemon.stats.find((item) => item.stat.name === 'hp')?.base_stat;
          const attack = pokemon.stats.find((item) => item.stat.name === 'attack')?.base_stat;
          const typeName = pokemon.types.map((item) => item.type.name);
          const newPokemon = {
            id: id,
            name: name,
            weight: weight,
            height: height,
            moves: moves.length,
            types: typeName,
            hp: hp,
            attack: attack
          };
          return newPokemon;
        });
        setPokemons(formattedPokemons);
        setItsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Head>
        <title>Pokemon Challenge</title>
        <meta name="description" content="Prueba tecnica Natalia Chiara, Marzo 2024" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/pokeball.png" />
      </Head>
      <Box minH="100vh" bg="radial-gradient(circle, rgba(251,247,63,1) 0%, rgba(252,70,70,1) 100%)">
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
        {itsLoading ? (
          <Text paddingTop="100px" textAlign="center" color="white" fontSize="xl">
            Cargando...
          </Text>
        ) : (
          <>
            {activeSection === 'pokedex' && <Pokedex pokemons={pokemons} />}
            {activeSection === 'trivia' && <Trivia pokemons={pokemons} />}
          </>
        )}
        {activeSection === 'inventory' && <Inventory />}
      </Box>
    </>
  );
}
