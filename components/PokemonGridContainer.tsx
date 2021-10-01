import React from 'react';
import PokemonGrid from './PokemonGrid';
import styles from './PokemonGridContainer.module.css';

export interface Type {
  name: string;
}

interface Sprites {
  other?: { 'official-artwork'?: { front_default: string } };
  front_default: string;
}

export interface IPokemon {
  id?: string;
  name: string;
  url: string;
  types?: Type[];
  sprites?: Sprites;
}

interface PokemonGridContainerProps {
  pokemons: IPokemon[];
  search: string;
}

const PokemonGridContainer: React.FC<PokemonGridContainerProps> = ({
  pokemons,
  search,
}) => {
  return (
    <div className={styles['grid-container']}>
      {pokemons &&
        pokemons
          .filter((pokemon) => pokemon.name.toLowerCase().includes(search))
          .map((pokemon, index) => (
            <PokemonGrid key={index} pokemon={pokemon} pokemonId={++index} />
          ))}
    </div>
  );
};

export default PokemonGridContainer;
