import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo__wrapper}>
        <Link href='/'>
          <Image src='/aliah_logo.svg' fill alt='Aliah Team logo' />
        </Link>
      </div>
    </header>
  );
};
