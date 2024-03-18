import { useState, useEffect } from 'react';
import { Flex, Button, Text } from '@chakra-ui/react';
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
        setItsLoading(false); // Mover aquí
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
        method: 'DELETE'
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
    console.log('update');
    setPokemons([]);
    setItsLoading(true);

    setTimeout(() => {
      getPokemons();
    }, 200); // Esperar 1 segundo antes de llamar a getPokemons()
  }

  return (
    <Flex
      marginTop="30px"
      padding="30px"
      flexDirection="column"
      alignItems="center"
      gap="30px"
      justifyContent="center"
      bg="radial-gradient(circle, rgba(75,251,63,1) 0%, rgba(54,60,255,1) 100%)">
      <Text color="white" fontSize="5xl" textAlign="center" paddingTop="30px">
        Inventario
      </Text>
      {pokemons.length != 0 && <Button onClick={deleteInventory}>Eliminar inventario</Button>}
      {itsLoading ? (
        <span>Cargando...</span>
      ) : (
        <PokemonContainer pokemons={pokemons} updateInventory={updateInventory} />
      )}
    </Flex>
  );
}
