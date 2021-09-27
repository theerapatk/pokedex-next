import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.css';

type Pokemon = {
  id: any;
  name: string;
  url: string;
  types?: any;
  sprites?: { front_default: string };
};

const Pokemons = ({
  pokemons,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    pokemons &&
    pokemons.map((pokemon, index: number) => (
      <div key={index} className={styles.grid}>
        <Link href={`/pokemons/${pokemon.id}`}>
          <a className={styles.card}>
            <h2>{pokemon.name}</h2>
            <Image
              src={pokemon?.sprites?.front_default!}
              alt={`${pokemon.name} sprite`}
              width={125}
              height={125}
            />
            <p>Find in-depth information about Next.js features and API.</p>
          </a>
        </Link>
      </div>
    ))
    // <InfiniteScroll
    //   dataLength={filteredPokemons.length}
    //   next={loadNext}
    //   hasMore={Boolean(nextUrl)}
    //   loader={
    //     <h4 style={{ textAlign: 'center' }}>
    //       <b>Loading more Pokémon</b>
    //     </h4>
    //   }
    //   endMessage={
    //     <h4 style={{ textAlign: 'center' }}>
    //       <b>
    //         {filteredPokemons.length > 0
    //           ? 'All Pokémon have been loaded'
    //           : 'No Pokémon found'}
    //       </b>
    //     </h4>
    //   }
    // >
    //   {pokemons &&
    //     pokemons.map((pokemon, index: number) => (
    //       <div key={index} className={styles.grid}>
    //         <Link href={`/pokemons/${pokemon.id}`}>
    //           <a className={styles.card}>
    //             <h2>{pokemon.name}</h2>
    //             <Image
    //               src={pokemon?.sprites?.front_default!}
    //               alt={`${pokemon.name} sprite`}
    //               width={125}
    //               height={125}
    //             />
    //             <p>Find in-depth information about Next.js features and API.</p>
    //           </a>
    //         </Link>
    //       </div>
    //     ))}
    // </InfiniteScroll>
  );
};

export const getStaticProps = async () => {
  const data = await getPokemons();
  const pokemons: Pokemon[] = data.results;

  const promises: unknown[] = [];
  pokemons.forEach((pokemon: Pokemon) => {
    promises.push(
      getPokemonByUrl(pokemon.url).then((detail) => {
        const defaultSprite = detail?.sprites?.front_default || '';
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

  return {
    props: {
      pokemons,
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

export default Pokemons;
