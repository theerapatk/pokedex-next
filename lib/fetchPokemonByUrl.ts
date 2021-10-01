import { IPokemon } from '../components/PokemonGridContainer';

const fetchPokemonByUrl = async (url: string) => {
  const response = await fetch(url);

  if (response.ok) return response.json();
  if (response.status === 404) return {};

  throw new Error(
    `Fetch for the Pokemon by URL: "${url}" failed with code: ${response.status}`
  );
};

export default fetchPokemonByUrl;
