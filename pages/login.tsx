import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FormEvent, useCallback, useContext, useEffect, useState } from 'react';
import { Loader } from '../src/components/Loader';
import { useUser } from '../src/contexts/user';
import styles from '../styles/Login.module.css';

const Login: NextPage = () => {
  const [user, setUser] = useUser();
  const router = useRouter();

  const [pin, setPin] = useState('');
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (user) router.push('/');
  });

  useEffect(() => {
    if (pin.length > 5) setIsBtnDisabled(false);
    else setIsBtnDisabled(true);
  }, [pin]);

  const handleInputChange = useCallback((e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setPin(target.value);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsBtnDisabled(true);
    setIsLoader(true);
    setIsError(false);

    axios
      .post('api/login', { pin: pin })
      .then((data) => {
        localStorage.setItem('pin', pin);
        setUser(true);
        router.push('/');
      })
      .catch((error: any) => {
        setIsError(true);
        setUser(false);
        setIsBtnDisabled(false);
        setIsLoader(false);
      });
  };

  if (isLoader) return <Loader />;

  return (
    <form className={styles.form} id='form' noValidate onSubmit={handleSubmit}>
      <input
        type='tel'
        required
        className={styles.input}
        value={pin}
        onChange={handleInputChange}
        placeholder='Enter PIN'
      />
      <button type='submit' className={styles.button} disabled={isBtnDisabled}>
        Login
      </button>
      {isError && (
        <span className={styles.error}>It did not work. Please check your PIN or try later.</span>
      )}
    </form>
  );
};

export default Login;
