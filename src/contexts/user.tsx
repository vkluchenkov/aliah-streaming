import { createContext, useContext } from 'react';

export const UserContext = createContext<[boolean | null, (user: boolean) => void]>([
  null,
  () => {},
]);

export const useUser = () => {
  const user = useContext(UserContext);
  return user;
};
