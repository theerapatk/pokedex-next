import styles from '@styles/Home.module.css';
import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/pokemons">
              <a>Pokemons</a>
            </Link>
          </li>
        </ul>
      </main>
    </div>
  );
};

export default Home;
