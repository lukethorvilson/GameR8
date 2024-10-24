import React from "react";
import useLoggedUser from "../hooks/useLoggedUser";
import PostForm from "../components/PostForm";

function HomePage() {
  const [, user] = useLoggedUser();
  return <div className="h-fit w-full"><PostForm user={user}/></div>;
}

export default HomePage;
