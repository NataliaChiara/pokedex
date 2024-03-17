import { Stack, Text, Image, HStack, Badge, AspectRatio } from '@chakra-ui/react';

export default function PokemonCard({ pokemon }) {
  return (
    <Stack
      bg="white"
      spacing="5"
      boxShadow="xl"
      p="5"
      w="full"
      borderRadius="xl"
      alignItems="center">
      <AspectRatio w="full" ratio={1}>
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
          alt="pokemon image"
        />
      </AspectRatio>
      <Text textAlign="center" textTransform="Capitalize">
        {pokemon.name}
      </Text>
      <HStack>
        {pokemon.types.map((type, index) => (
          <Badge size="xs" key={index}>
            {type}
          </Badge>
        ))}
      </HStack>
    </Stack>
  );
}
