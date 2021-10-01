import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IPokemon } from './PokemonGridContainer';
import styles from './PokemonGrid.module.css';
import Type from './Type';

interface PokemonGridProps {
  pokemon: IPokemon;
  pokemonId: number;
}

const PokemonGrid: React.FC<PokemonGridProps> = ({ pokemon, pokemonId }) => {
  return (
    <div className={styles.grid}>
      <Link href={`/pokemons/${pokemonId}`}>
        <a
          className={`${styles.card} ${
            styles[`background-${pokemon.types?.[0].name}`]
          }`}
        >
          <h3 className={styles.name}>{`${pokemon.id} ${pokemon.name}`}</h3>
          <div className={styles.image}>
            <Image
              src={pokemon.sprites?.front_default!}
              alt={`Sprite of ${pokemon.name}`}
              // placeholder="blur"
              // blurDataURL={`data:image/png;base64,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`}
              width={165}
              height={165}
            />
          </div>
          <div className={styles['type-container']}>
            {pokemon.types?.map((type) => (
              <Type key={type.name} name={type.name} />
            ))}
          </div>
        </a>
      </Link>
    </div>
  );
};

export default PokemonGrid;
