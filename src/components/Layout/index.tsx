import Head from 'next/head';
import styles from './styles.module.css';
import { Inter } from '@next/font/google';
import { Header } from '../Header';

const inter = Inter({ subsets: ['latin'] });

interface LayoutProps {
  children: any;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Head>
        <title>Aliah Team Online</title>
        <meta name='description' content='Aliah team online lessons' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {/* <link rel='icon' href='/favicon.ico' /> */}
      </Head>
      <Header />
      <main className={styles.main}>{children}</main>
    </>
  );
};
