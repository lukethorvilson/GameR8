import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

function GamePage() {
  const { id } = useParams();
  const [gameData, setGameData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchGame() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_RAWG_GAMES}/${id}?key=${import.meta.env.VITE_RAWG_API_KEY}`,
        );
        const data = await response.json();
        setGameData(data);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchGame();
  }, []);

  console.log(gameData);
  return (
    <div>
      {isLoading && <Spinner className="mx-auto" />}
      Games
    </div>
  );
}

export default GamePage;
