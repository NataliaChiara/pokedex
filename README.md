# Pokémon Test

El objetivo de la app es listar todos los Pokémon y mostrar información de los mismos al clickear sobre ellos. También la app mostrará de alguna forma los Pokémon que el usuario tiene capturados.

## Comenzando

Correr servidor de desarrollo:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Objetivos

- Limpiar el proyecto template y detectar errores o mejoras.
- Optimizar la app en cuanto accesibilidad.
- Integrar la API interna para mostar que Pokémon tiene capturados el usuario.
- Terminar de integrar la API de [PokeApi](https://pokeapi.co/docs/v2#info) para que la app cumpla con todo lo que pide el enunciado.
- Hacer mejoras de UX / UI que considere pertinentes.
- Optimizar diseño responsive.

### Anotaciones

- Cualquier mejora no especificada previamente será valorada.
- Ante una duda con el enunciado, tomar una decisión y resolver como crea pertinente.
- Si tiene problemas con la base de datos interna puede renombrar el archivo `db-example.json` a `db.json` para comenzar de 0.

### Documentación útil

- [Next.JS](https://nextjs.org/docs)
- [Chakra UI](https://chakra-ui.com/getting-started)
- [PokeAPI](https://pokeapi.co/docs/v2#info)
- [Axios](https://axios-http.com/es/docs/intro)

## API Pokémon atrapados

### Obtener todos los Pokémon atrapados.

#### Request

`GET /api/catched`

#### Response

```json
[
  {
    "id": 1,
    "name": "bulbasaur"
  },
  {
    "id": 2,
    "name": "venasaur"
  }
]
```

### Atrapar un Pokémon.

#### Request

`POST /api/catched`

#### Body

```json
{
  "id": 1,
  "name": "bulbasaur"
}
```

#### Reponse

```json
{
  "id": 1,
  "name": "bulbasaur"
}
```

### Eliminar un Pokémon atrapado.

#### Request

`DELETE /api/catched/{pokemonId}`

#### Reponse

`HTTP STATUS 200`
