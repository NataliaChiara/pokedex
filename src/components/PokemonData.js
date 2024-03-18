import { AspectRatio, Image, Stack, Progress, Text, Badge, HStack, Button } from '@chakra-ui/react';

export default function PokemonData({ pokemon, itsPokedex, updateInventory }) {
  const { weight, height, moves, hp, attack } = pokemon;

  function savePokemon(pokemon) {
    const { id, name, weight, height, moves, types, hp, attack } = pokemon;
    const newPokemon = {
      id: id,
      name: name,
      weight: weight,
      height: height,
      moves: moves.length,
      types: types,
      hp: hp,
      attack: attack
    };
    fetch('http://localhost:3000/api/catched', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPokemon)
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al enviar el Pokémon');
        }
      })
      .then((data) => {
        console.log('se guardo: ', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function deletePokemon(pokemonId) {
    fetch(`http://localhost:3000/api/catched/${pokemonId}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('pokemon eliminado', pokemonId);
        updateInventory();
      })
      .catch((error) => {
        console.error('Hubo un problema con la solicitud:', error);
      });
  }

  return (
    <Stack spacing="5" pb="5">
      <Stack spacing="5" position="relative">
        {itsPokedex ? (
          <Button onClick={() => savePokemon(pokemon)}>Guardar en el inventario</Button>
        ) : (
          <Button onClick={() => deletePokemon(pokemon.id)}>Delete</Button>
        )}
        <AspectRatio w="full" ratio={1}>
          <Image
            objectFit="contain"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
            alt="pokemon image"
          />
        </AspectRatio>
        <Stack margin="auto">
          <Text fontSize="sm">Tipos</Text>
          <HStack>
            {pokemon.types.map((type, index) => (
              <Badge size="xs" key={index}>
                {type}
              </Badge>
            ))}
          </HStack>
        </Stack>
        <Stack width="fit-content" margin="auto" direction="row">
          <Stack>
            <Text fontSize="sm">Weight</Text>
            <Text textAlign="center">{weight}</Text>
          </Stack>
          <Stack>
            <Text fontSize="sm">Height</Text>
            <Text textAlign="center">{height}</Text>
          </Stack>
          <Stack>
            <Text fontSize="sm">Movimientos</Text>
            <Text textAlign="center">{moves}</Text>
          </Stack>
        </Stack>
      </Stack>

      <Stack spacing="5" p="5" bg="gray.100" borderRadius="xl">
        <Stack>
          <Text fontSize="xs">hp</Text>
          <Progress bg="gray.300" borderRadius="full" value={hp} />
        </Stack>
        <Stack>
          <Text fontSize="xs">attack</Text>
          <Progress bg="gray.300" borderRadius="full" value={attack} />
        </Stack>
      </Stack>
    </Stack>
  );
}
