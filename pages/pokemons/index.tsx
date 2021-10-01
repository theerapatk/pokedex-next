import styles from './index.module.css';
import Image from 'next/image';
import Link from 'next/link';
import useSWRInfinite from 'swr/infinite';
import fetchPokemonByUrl from '../../lib/fetchPokemonByUrl';
import fetchPokemons from '../../lib/fetchPokemons';
import fetchPokemonsWithDetail, {
  PokeApiPageData,
} from '../../lib/fetchPokemonsWithDetail';
import React, { useCallback, useState } from 'react';
import PokemonGridContainer from '../../components/PokemonGridContainer';

const PAGE_SIZE = 10;

const MemoedPokemonGridContainer = React.memo(PokemonGridContainer);

const Pokemons = () => {
  const [search, setSearch] = useState('');
  const onSetSearch = useCallback((evt) => setSearch(evt.target.value), []);

  const { data, error, isValidating, mutate, size, setSize } = useSWRInfinite(
    (pageIndex: number, previousPageData: PokeApiPageData | null) => {
      if (previousPageData && !previousPageData.next) return null;
      const offset = pageIndex * PAGE_SIZE;
      return [
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${PAGE_SIZE}`,
        search,
      ];
    },
    fetchPokemonsWithDetail
  );

  const pokemons = data ? data.flatMap((each) => each.results) : [];

  return (
    <>
      <div className={styles['top-bar']}>
        <div>Search</div>
        <input type="text" value={search} onChange={onSetSearch}></input>
        <button onClick={() => setSize(size + 1)}>load more</button>
      </div>
      <MemoedPokemonGridContainer pokemons={pokemons} />
    </>
  );
};

export default Pokemons;
