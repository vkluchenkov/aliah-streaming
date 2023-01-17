import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from '../src/components/Layout';
import { useEffect, useState } from 'react';
import { UserContext } from '../src/contexts/user';
import { Loader } from '../src/components/Loader';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [user, setUser] = useState(false);

  useEffect(() => {
    const pin = localStorage.getItem('pin');
    if (pageProps.protected && !user)
      axios
        .post('api/login', { pin: pin })
        .then((data) => {
          setUser(true);
          localStorage.setItem('pin', pin as string);
        })
        .catch((error: any) => {
          localStorage.removeItem('pin');
          router.push('/login');
        });
  }, [router, setUser, user, pageProps]);

  if (pageProps.protected && !user)
    return (
      <Layout>
        <Loader />
      </Layout>
    );

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  );
}
