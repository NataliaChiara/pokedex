import { useState, useEffect } from 'react';
import {
  Button,
  SimpleGrid,
  Flex,
  Box,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  Text,
  Select
} from '@chakra-ui/react';

import PokemonCard from '@/components/PokemonCard';
import PokemonData from '@/components/PokemonData';

export default function PokemonContainer({ pokemons, nextPage, itsPokedex, updateInventory }) {
  const [selectedPokemon, setSelectedPokemon] = useState();
  const pokemonDataModal = useDisclosure();
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState();
  const [filteredPokemons, setFilteredPokemons] = useState();
  const [itsFiltered, setItsFiltered] = useState(false);

  function getAllTypes(pokemons) {
    const totalTypes = ['Filtrar por tipo'];

    pokemons.forEach((pokemon) => {
      pokemon.types.forEach((typeName) => {
        if (!totalTypes.includes(typeName)) {
          totalTypes.push(typeName);
        }
      });
    });

    setTypes(totalTypes);
  }

  useEffect(() => {
    getAllTypes(pokemons);
  }, [pokemons]);

  function handleViewPokemon(pokemon) {
    setSelectedPokemon(pokemon);
    pokemonDataModal.onOpen();
  }

  function filterTypes(event) {
    const selectedType = event.target.value;
    setSelectedType(selectedType);

    if (selectedType == 'Filtrar por tipo') {
      setFilteredPokemons(pokemons);
      setItsFiltered(false);
    } else {
      const filtered = pokemons.filter((pokemon) => pokemon.types.includes(selectedType));
      setFilteredPokemons(filtered);
      setItsFiltered(true);
    }
  }

  return (
    <>
      <Select
        bg="white"
        width="200px"
        margin="auto auto 30px auto"
        value={selectedType}
        onChange={filterTypes}>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </Select>
      <Flex flexDirection="column" minH="100vh" width="70vw" margin="auto">
        {pokemons.length === 0 ? (
          <Text textAlign="center" marginTop="30px">
            No hay pokemons para mostrar
          </Text>
        ) : (
          <SimpleGrid spacing="5" columns={{ base: 1, md: 5 }}>
            {itsFiltered
              ? filteredPokemons.map((pokemon) => (
                  <Box as="button" key={pokemon.id} onClick={() => handleViewPokemon(pokemon)}>
                    <PokemonCard pokemon={pokemon} />
                  </Box>
                ))
              : pokemons.map((pokemon) => (
                  <Box as="button" key={pokemon.id} onClick={() => handleViewPokemon(pokemon)}>
                    <PokemonCard pokemon={pokemon} />
                  </Box>
                ))}
          </SimpleGrid>
        )}
        {itsPokedex && !itsFiltered && (
          <Button width="fit-content" margin="30px auto" onClick={nextPage}>
            Cargar más
          </Button>
        )}
      </Flex>
      <Modal {...pokemonDataModal}>
        <ModalOverlay />
        <ModalContent width="300px">
          <ModalHeader textTransform="capitalize">{selectedPokemon?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedPokemon && (
              <PokemonData
                pokemon={selectedPokemon}
                itsPokedex={itsPokedex}
                updateInventory={updateInventory}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
