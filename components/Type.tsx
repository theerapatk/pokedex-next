import Image from 'next/image';
import styles from './Type.module.css';
import bug from '../public/images/type/Icon_Bug.png';
import dark from '../public/images/type/Icon_Dark.png';
import dragon from '../public/images/type/Icon_Dragon.png';
import electric from '../public/images/type/Icon_Electric.png';
import fairy from '../public/images/type/Icon_Fairy.png';
import fighting from '../public/images/type/Icon_Fighting.png';
import fire from '../public/images/type/Icon_Fire.png';
import flying from '../public/images/type/Icon_Flying.png';
import ghost from '../public/images/type/Icon_Ghost.png';
import grass from '../public/images/type/Icon_Grass.png';
import ground from '../public/images/type/Icon_Ground.png';
import ice from '../public/images/type/Icon_Ice.png';
import normal from '../public/images/type/Icon_Normal.png';
import poison from '../public/images/type/Icon_Poison.png';
import psychic from '../public/images/type/Icon_Psychic.png';
import rock from '../public/images/type/Icon_Rock.png';
import steel from '../public/images/type/Icon_Steel.png';
import water from '../public/images/type/Icon_Water.png';

interface Props {
  name: string;
}

const getTypeIcon = (typeName: string): StaticImageData => {
  if (typeName === 'normal') return normal;
  else if (typeName === 'fighting') return fighting;
  else if (typeName === 'flying') return flying;
  else if (typeName === 'poison') return poison;
  else if (typeName === 'ground') return ground;
  else if (typeName === 'rock') return rock;
  else if (typeName === 'bug') return bug;
  else if (typeName === 'ghost') return ghost;
  else if (typeName === 'steel') return steel;
  else if (typeName === 'fire') return fire;
  else if (typeName === 'water') return water;
  else if (typeName === 'grass') return grass;
  else if (typeName === 'electric') return electric;
  else if (typeName === 'psychic') return psychic;
  else if (typeName === 'ice') return ice;
  else if (typeName === 'dragon') return dragon;
  else if (typeName === 'dark') return dark;
  else if (typeName === 'fairy') return fairy;
  else return normal;
};

const Type: React.FC<Props> = ({ name }) => {
  return (
    <span className={`${styles.container}`}>
      <div className={styles['inner-container']}>
        <Image
          src={getTypeIcon(name)}
          alt={`Type ${name}`}
          width={25}
          height={25}
        />
        <span className={styles['type-text']}>{name}</span>
      </div>
    </span>
  );
};

export default Type;
