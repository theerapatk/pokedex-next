const fetchPokemonById = async (id: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  if (response.ok) return response.json();
  if (response.status === 404) return {};

  throw new Error(
    `Fetch for the Pokemon ID: "${id}" failed with code: ${response.status}`
  );
};

export default fetchPokemonById;
