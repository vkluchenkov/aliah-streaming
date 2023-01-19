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
    const token = localStorage.getItem('token');
    if (pageProps.protected && !user)
      axios
        .post('api/auth', { token: token })
        .then((data) => {
          setUser(true);
        })
        .catch((error: any) => {
          localStorage.removeItem('token');
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
