const fetchPokemons = async (nextUrl = '') => {
  const url =
    nextUrl.trim() === '' ? 'https://pokeapi.co/api/v2/pokemon' : nextUrl;
  const response = await fetch(url);

  if (response.ok) return response.json();
  if (response.status === 404) return {};

  throw new Error(
    'Fetch for the Pokemons failed with code: ${response.status}'
  );
};

export default fetchPokemons;
