import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IPokemon } from './PokemonGridContainer';
import styles from './PokemonGrid.module.css';

interface PokemonGridProps {
  pokemon: IPokemon;
  pokemonId: number;
}

const PokemonGrid: React.FC<PokemonGridProps> = ({ pokemon, pokemonId }) => {
  return (
    <div className={styles.grid}>
      <Link href={`/pokemons/${pokemonId}`}>
        <a className={styles.card}>
          <h3>{`${pokemon.id} ${pokemon.name}`}</h3>
          <div className={styles.image}>
            <Image
              src={pokemon.sprites?.front_default!}
              alt={`Sprite of ${pokemon.name}`}
              width={125}
              height={125}
            />
          </div>
          <p>{pokemon.name}</p>
        </a>
      </Link>
    </div>
  );
};

export default PokemonGrid;
