import { useEffect, useState } from "react";

export default function useGamePageData(id) {
  const [gameData, setGameData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchGame() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_RAWG_GAMES}/${id}?key=${import.meta.env.VITE_RAWG_API_KEY}`,
        );
        const data = await response.json();
        setIsLoading(false);
        setGameData(data);
      } catch (err) {
        console.log(err.message);
        setIsLoading(false);
      }
    }
    fetchGame();
  }, [id]);

  return [gameData, isLoading];
}
