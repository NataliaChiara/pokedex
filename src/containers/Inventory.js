import { useState, useEffect } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import PokemonContainer from '../components/PokemonContainer';

export default function Inventory() {
  const [pokemons, setPokemons] = useState([]);
  const [itsLoading, setItsLoading] = useState(true);

  function getPokemons() {
    fetch('http://localhost:3000/api/catched', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const pokemons = data.map((item) => item);
        setPokemons((prev) => [...prev, ...pokemons]);
        setItsLoading(false);
      })
      .catch((error) => {
        console.error('Hubo un problema con la solicitud:', error);
      });
  }

  useEffect(() => {
    getPokemons();
  }, []);

  async function deleteInventory() {
    try {
      const response = await fetch('http://localhost:3000/api/catched', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        console.log('Lista de Pokémon atrapados eliminada correctamente.');
      } else {
        console.error(
          'Error al intentar eliminar la lista de Pokémon atrapados:',
          response.statusText
        );
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
    setPokemons([]);
  }

  function updateInventory() {
    setPokemons([]);
    setItsLoading(true);

    setTimeout(() => {
      getPokemons();
    }, 200);
  }

  return (
    <Flex
      minH="100vh"
      paddingTop="60px"
      flexDirection="column"
      bg="radial-gradient(circle, rgba(75,251,63,1) 0%, rgba(54,60,255,1) 100%)">
      <Text color="white" fontSize="5xl" textAlign="center" padding="30px 0">
        Inventario
      </Text>
      {itsLoading ? (
        <Text textAlign="center" color="white">
          Cargando...
        </Text>
      ) : (
        <PokemonContainer
          pokemons={pokemons}
          updateInventory={updateInventory}
          deleteInventory={deleteInventory}
        />
      )}
    </Flex>
  );
}
