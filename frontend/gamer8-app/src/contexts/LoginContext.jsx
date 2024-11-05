import { createContext, useEffect, useState } from 'react';

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const hasAccess =
    !user || !Object.entries(user).length ? false : true;
  useEffect(() => {
    async function fetchLogged() {
      setIsLoading(true);
      try {
        const response = await fetch(
          'http://localhost:8000/gamer8/api/v1/users/logged',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // This allows cookies to be sent
          },
        );
        if (response.ok) {
          const data = await response.json();
          if (data?.body?.user) {
            setUser(data.body.user);
          }
          setIsLoading(false);
        } else if (
          response.status === 401 ||
          response.status === 403
        ) {
          setUser({});
          setIsLoading(false);
        }
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchLogged();
  }, []);
  //   return [hasAccess, user, setUser, isLoading];
  return (
    <LoginContext.Provider
      value={{ user, isLoading, hasAccess }}
    >
      {children}
    </LoginContext.Provider>
  );
};
