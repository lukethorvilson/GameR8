import React from "react";
import useLoggedUser from "../hooks/useLoggedUser";

function Home() {
  const [, user] = useLoggedUser();
  return <div className="text-4xl">{user?.fullName}</div>;
}

export default Home;
