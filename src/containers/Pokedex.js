import { useEffect, useState } from 'react';
import axios from 'axios';
import { Flex, Text } from '@chakra-ui/react';
import PokemonContainer from '../components/PokemonContainer';

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [itsLoading, setItsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(
    'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0'
  );

  function getData() {
    setItsLoading(true);
    axios.get(currentPage).then(async ({ data }) => {
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
      setPokemons((prev) => [...prev, ...formattedPokemons]);
      setCurrentPage(data.next);
      setItsLoading(false);
    });
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex
      minH="100vh"
      paddingTop="60px"
      flexDirection="column"
      bg="radial-gradient(circle, rgba(251,247,63,1) 0%, rgba(252,70,70,1) 100%)">
      <Text color="white" fontSize="5xl" textAlign="center" padding="30px 0">
        Pokedex
      </Text>
      {itsLoading ? (
        <Text textAlign="center" color="white">
          Cargando...
        </Text>
      ) : (
        <PokemonContainer pokemons={pokemons} nextPage={getData} itsPokedex />
      )}
    </Flex>
  );
}
