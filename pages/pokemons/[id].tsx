import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { IPokemon } from '../../components/PokemonGridContainer';
import fetchPokemonById from '../../lib/fetchPokemonById';

const POKEMON_ID = /^[0-9]+$/;

interface Props {
  pokemon: IPokemon;
}

const Pokemon: React.FC<Props> = ({ pokemon }) => {
  const { isFallback } = useRouter();

  return (
    <>
      {isFallback ? (
        <div>loading...</div>
      ) : (
        <div className="grid">
          <div className="card">
            <h2>{`${pokemon.id} ${pokemon.name}`}</h2>
            <Image
              src={pokemon.sprites?.other?.['official-artwork']?.front_default!}
              alt={`${pokemon.name} sprite`}
              width={125}
              height={125}
            />
            <p>{pokemon.name}</p>
          </div>
        </div>
      )}

      <style jsx>{`
        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
          width: 45%;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h2 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }
      `}</style>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;

  if (id.length > 4 || !POKEMON_ID.test(id)) {
    return { notFound: true };
  }

  try {
    const pokemon = await fetchPokemonById(id);
    return pokemon ? { props: { pokemon } } : { notFound: true };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export default Pokemon;
