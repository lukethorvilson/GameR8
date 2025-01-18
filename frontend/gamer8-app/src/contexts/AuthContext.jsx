import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // checks if user is authenticated/ thus being user data is found after the effect below runs
  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  function setAuth({ user, authenticated }) {
    if (!authenticated) {
      console.log('User not authenticated');
      setUser(null);
      setIsAuthenticated(false);
    } else {
      console.log('User authenticated');
      setUser(user);
      setIsAuthenticated(true);
    }
  }

  // function to check if user is authenticated
  const checkAuthentication = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        'http://localhost:8000/gamer8/api/v1/users/status',
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
        setAuth(data.data);
      } else {
        console.log('User not authenticated');
        setIsAuthenticated(false);
        setUser(null); // user not logged in, set null
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // handles logout functionality
  async function handleLogout() {
    try {
      setIsLoading(true);
      const response = await fetch(
        'http://localhost:8000/gamer8/api/v1/users/logout',
        {
          method: 'POST',
          credentials: 'include',
        },
      );
      if (response.ok) {
        // check if user is un-authenticated
        await checkAuthentication();
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  // effect to check if user is authenticated in
  useEffect(() => {
    checkAuthentication();
  }, []);

  //   return [user, isLoading, isAuthenticated, checkAuthentication];
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        checkAuthentication,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
