import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Flex, Box, Text, Button } from '@chakra-ui/react';
import styles from '@/styles/Home.module.css';

export default function Trivia(data) {
  const [pokemon, setPokemon] = useState(null);
  const [valor, setValor] = useState('');
  const [adivinados, setAdivinados] = useState(0);
  const [erroneos, setErroneos] = useState(0);
  const [salteados, setSalteados] = useState(0);

  function getData(data) {
    const pokemonData = data.data.results.map((result) => {
      const parts = result.url.split('/');
      const id = parts[parts.length - 2];
      return { id: id, name: result.name };
    });

    const randomPokemon = pokemonData[Math.floor(Math.random() * pokemonData.length)];
    setPokemon(randomPokemon);
    setValor('');
  }

  useEffect(() => {
    getData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (pokemon) {
    console.log(pokemon.name.replace('-', ' '));
  }

  const handleCambio = (event) => {
    setValor(event.target.value);
  };

  const getResult = () => {
    const pokemonName = pokemon.name.replace('-', ' ');
    if (pokemonName === valor.toLowerCase()) {
      alert('¡Correcto!');
      setAdivinados(adivinados + 1);
      getData(data);
    } else {
      alert('Incorrecto');
      setErroneos(erroneos + 1);
      getData(data);
    }
  };

  const saltarPokemon = () => {
    setSalteados(salteados + 1);
    getData(data);
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      flexDirection="column"
      gap="30px"
      bg="radial-gradient(circle, rgba(135,63,251,1) 0%, rgba(255,81,172,1) 100%)">
      <Text color="white" fontSize="5xl" textAlign="center" padding="30px 0">
        Trivia
      </Text>
      <Box color="white">
        <Text>Adivinados: {adivinados}</Text>
        <Text>Erroneos: {erroneos}</Text>
        <Text>Salteados: {salteados}</Text>
      </Box>
      <div className={styles.image_container}>
        {pokemon && (
          <Image
            className={styles.image}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
            alt="pokemon image"
            width={200}
            height={200}
          />
        )}
      </div>
      <input
        id="inputTexto"
        type="text"
        value={valor}
        onChange={handleCambio}
        placeholder="Escribir el nombre"
      />
      <Flex gap="10px">
        <Button onClick={getResult}>Enviar</Button>
        <Button onClick={saltarPokemon}>Saltar</Button>
      </Flex>
    </Flex>
  );
}
