import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Flex, Box, Text, Button } from '@chakra-ui/react';
import s from '@/styles/Home.module.css';

export default function Trivia(data) {
  const [pokemon, setPokemon] = useState(null);
  const [inputValue, setInputValue] = useState();
  const [count, setCount] = useState({
    next: 0,
    right: 0,
    wrong: 0
  });

  function getData() {
    axios.get('https://pokeapi.co/api/v2/pokemon/').then(async ({ data }) => {
      axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${data.count}`).then(async ({ data }) => {
        const pokemonData = data.results.map((result) => {
          const parts = result.url.split('/');
          const id = parts[parts.length - 2];
          return { id: id, name: result.name };
        });

        const randomPokemon = pokemonData[Math.floor(Math.random() * pokemonData.length)];
        setPokemon(randomPokemon);
        setInputValue('');
      });
    });
  }

  useEffect(() => {
    getData();
  }, []);

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  function send() {
    const pokemonName = pokemon.name.replace('-', ' ');
    if (pokemonName === inputValue.toLowerCase()) {
      alert('¡Correcto!');
      setCount((prevCount) => ({
        ...prevCount,
        right: prevCount.right + 1
      }));
    } else {
      alert('Incorrecto');
      setCount((prevCount) => ({
        ...prevCount,
        wrong: prevCount.wrong + 1
      }));
    }
    getData(data);
  }

  function next() {
    setCount((prevCount) => ({
      ...prevCount,
      next: prevCount.next + 1
    }));
    getData(data);
  }

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      flexDirection="column"
      gap="30px"
      bg="radial-gradient(circle, rgba(135,63,251,1) 0%, rgba(255,81,172,1) 100%)">
      <Text color="white" fontSize="5xl" textAlign="center">
        Trivia
      </Text>
      <Flex color="white" gap="15px">
        <Text>Adivinados: {count.right}</Text>
        <Text>Erroneos: {count.wrong}</Text>
        <Text>Salteados: {count.next}</Text>
      </Flex>
      <Box className={s.trivia_image_container}>
        {pokemon && (
          <Image
            className={s.trivia_image}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
            alt="pokemon image"
            width={200}
            height={200}
          />
        )}
      </Box>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Escribir el nombre"
      />
      <Flex gap="10px">
        <Button onClick={send}>Enviar</Button>
        <Button onClick={next}>Saltar</Button>
      </Flex>
    </Flex>
  );
}
