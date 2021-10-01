import React, { useCallback, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import PokemonGridContainer from '../../components/PokemonGridContainer';
import fetchPokemonsWithDetail, {
  PokeApiPageData,
} from '../../lib/fetchPokemonsWithDetail';
import styles from './index.module.css';

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
      <MemoedPokemonGridContainer pokemons={pokemons} search={search} />
    </>
  );
};

export default Pokemons;
