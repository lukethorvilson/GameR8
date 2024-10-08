import React from "react";
import useLoggedUser from "../hooks/useLoggedUser";

function Home() {
  const [hasAccess, user, setUser, isLoading] = useLoggedUser()
  return <div className="text-4xl">{user.fullName}</div>;

}

export default Home;
