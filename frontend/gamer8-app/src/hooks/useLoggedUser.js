import { useEffect, useState } from "react";

export default function useLoggedUser() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const hasAccess = Object.entries(user).length !== 0 ? true : false;
  useEffect(() => {
    async function fetchLogged() {
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://localhost:8000/gamer8/api/v1/users/logged",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // This allows cookies to be sent
          },
        );
        if (response.ok) {
          let data = await response.json();
          data = data.parse();
          if (data?.body?.user) {
            setUser(data.body.user);
          }
          isLoading(false);
        } else if (response.status === 401 || response === 403) {
          setUser({});
          setIsLoading(false);
        }
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchLogged();
  }, []);
  return [hasAccess, user, setUser, isLoading];
}
