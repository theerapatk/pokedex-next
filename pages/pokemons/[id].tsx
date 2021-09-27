import { GetStaticPaths, NextComponentType } from 'next';
import Link from 'next/link';
// import styles from './Pokemon.module.css';

type Pokemon = {
  id: any;
  name: string;
  url: string;
  types?: any;
  sprites?: { front_default: string };
};

const Pokemon = ({ pokemon }: any) => {
  return (
    <div>
      <h2>{pokemon.id}</h2>
      <h2>{pokemon.name}</h2>
      <p>Find in-depth information about Next.js features and API.</p>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getPokemons();
  const pokemons: Pokemon[] = data.results;

  const promises: unknown[] = [];
  pokemons.forEach((pokemon: Pokemon) => {
    promises.push(
      getPokemonByUrl(pokemon.url).then((detail) => {
        const defaultSprite = detail.sprites.front_default;
        pokemon.id = detail.id + '';
        pokemon.types = detail.types.flatMap((type: any) => type.type);
        pokemon.sprites = {
          front_default:
            detail.sprites.other?.['official-artwork']?.front_default ||
            defaultSprite,
        };
      })
    );
  });

  await Promise.allSettled(promises);

  const paths = pokemons.map((pokemon) => ({
    params: { id: pokemon.id },
  }));

  console.log(paths);
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: any) => {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  console.log(params);
  const pokemon = await getPokemonById(params.id);

  // Pass post data to the page via props
  return {
    props: {
      pokemon,
    },
  };
};

const getPokemons = async (nextUrl = '') => {
  const url =
    nextUrl.trim() === '' ? 'https://pokeapi.co/api/v2/pokemon' : nextUrl;
  const response = await fetch(url);
  return await response.json();
};

const getPokemonByUrl = async (url: string) => {
  const response = await fetch(url);
  return await response.json();
};

const getPokemonById = async (id: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return await response.json();
};

export default Pokemon;
