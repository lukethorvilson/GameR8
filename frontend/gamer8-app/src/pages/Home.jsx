import React from "react";
import useStoredData from "../hooks/useStoredData";

function Home() {
  const [user, tokens] = useStoredData();
  return <div className="text-4xl">{user.user.fullName}</div>;

}

export default Home;
