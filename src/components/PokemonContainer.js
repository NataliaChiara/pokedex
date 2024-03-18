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

export default function PokemonContainer({
  pokemons,
  nextPage,
  itsPokedex,
  updateInventory,
  deleteInventory
}) {
  const [selectedPokemon, setSelectedPokemon] = useState();
  const pokemonDataModal = useDisclosure();
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState();
  const [filteredPokemons, setFilteredPokemons] = useState();
  const [itsFiltered, setItsFiltered] = useState(false);

  // filtro

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

  // modal

  function handleViewPokemon(pokemon) {
    setSelectedPokemon(pokemon);
    pokemonDataModal.onOpen();
  }

  function handleCloseModal() {
    pokemonDataModal.onClose();
  }

  const pokemonsToShow = itsFiltered ? filteredPokemons : pokemons;

  return (
    <>
      <Box>
        {pokemons.length === 0 ? (
          !itsPokedex && (
            <Text textAlign="center" color="white">
              No hay pokemons para mostrar
            </Text>
          )
        ) : (
          <Flex width="70vw" flexDirection="column" gap="30px" margin="0 auto" alignItems="center">
            <Flex justifyContent="center" gap="50px">
              <Select bg="white" width="200px" value={selectedType} onChange={filterTypes}>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
              {!itsPokedex && <Button onClick={deleteInventory}>Eliminar inventario</Button>}
            </Flex>

            <SimpleGrid spacing="5" columns={{ base: 1, md: 5 }}>
              {pokemonsToShow.map((pokemon) => (
                <Box as="button" key={pokemon.id} onClick={() => handleViewPokemon(pokemon)}>
                  <PokemonCard pokemon={pokemon} />
                </Box>
              ))}
            </SimpleGrid>
            {itsPokedex && !itsFiltered && (
              <Button width="fit-content" margin="30px auto" onClick={nextPage}>
                Cargar más
              </Button>
            )}
          </Flex>
        )}
      </Box>
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
                handleCloseModal={handleCloseModal}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
