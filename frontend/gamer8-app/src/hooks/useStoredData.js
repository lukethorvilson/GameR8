import { useEffect, useState } from "react";

function useStoredData() {
  const [tokens, setTokens] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    const tokens = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (user) setUser(JSON.parse(user).user);
    if (tokens) setTokens(JSON.parse(tokens));
    localStorage.clear();
  }, []);
  return [user, tokens];
}

export default useStoredData;
