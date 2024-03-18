import { useEffect, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import PokemonContainer from '../components/PokemonContainer';

export default function Pokedex({ pokemons }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedPokemons, setSelectedPokemons] = useState([]);
  const [noMorePokemons, setNoMorePokemons] = useState(false);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(pokemons.length / itemsPerPage);

  function getPokemonsPerPage(pageNumber) {
    if (pageNumber >= totalPages) {
      setNoMorePokemons(true);
    }
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pokemonsPerPage = pokemons.slice(startIndex, endIndex);
    setSelectedPokemons((prev) => prev.concat(pokemonsPerPage));
    setPageNumber((prev) => prev + 1);
  }

  useEffect(() => {
    getPokemonsPerPage(pageNumber);
  }, []);

  return (
    <Flex paddingTop="60px" flexDirection="column">
      <Text color="white" fontSize="5xl" textAlign="center" padding="30px 0">
        Pokedex
      </Text>

      <PokemonContainer
        pokemons={selectedPokemons}
        nextPage={() => getPokemonsPerPage(pageNumber)}
        itsPokedex
        noMorePokemons={noMorePokemons}
      />
    </Flex>
  );
}
