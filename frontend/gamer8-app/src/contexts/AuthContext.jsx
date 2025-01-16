import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // checks if user is authenticated/ thus being user data is found after the effect below runs
  const isAuthenticated =
    !user || !Object.entries(user).length ? false : true;
  

  // effect to check if user is authenticated in
  useEffect(() => {
    async function fetchLogged() {
      // being making request to server to check if user is logged in
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
        ); // fetch logged in user
        if (response.ok) {
          const data = await response.json();
          if (data?.body?.user) {
            setUser(data.body.user); // set user if logged
          }
        } else if (
          response.status === 401 ||
          response.status === 403
        ) {
          setUser(null); // user not logged in, set null
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLogged();
  }, []);
  //   return [hasAccess, user, setUser, isLoading];
  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
