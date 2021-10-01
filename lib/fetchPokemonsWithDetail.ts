import { IPokemon, Type } from '../components/PokemonGridContainer';
import fetchPokemonByUrl from './fetchPokemonByUrl';

export interface PokeApiPageData {
  count: number;
  next: string | null;
  previous: string | null;
  results: any[];
}

const fetchPokemonsWithDetail = async (url: string, search: string) =>
  fetch(url).then(async (response) => {
    const data: PokeApiPageData = await response.json();

    data.results = data.results.filter((pokemon: IPokemon) =>
      pokemon.name.toLowerCase().includes(search)
    );

    const promises: Promise<any>[] = buildPromises(data);
    await Promise.allSettled(promises);
    return data;
  });

const buildPromises = (data: PokeApiPageData) => {
  const promises: Promise<any>[] = [];
  data.results.forEach((pokemon: IPokemon) => {
    promises.push(
      fetchPokemonByUrl(pokemon.url).then((detail: any) => {
        const defaultSprite = detail?.sprites?.front_default || '';
        pokemon.id = detail.id + '';
        pokemon.types = detail.types!.flatMap(
          (type: { type: any }) => type.type
        );
        pokemon.sprites = {
          front_default:
            detail.sprites?.other?.['official-artwork']?.front_default ||
            defaultSprite,
        };
      })
    );
  });
  return promises;
};

export default fetchPokemonsWithDetail;
