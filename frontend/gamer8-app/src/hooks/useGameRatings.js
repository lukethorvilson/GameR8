import { useEffect, useState } from 'react';

export default function useGameRatings(gameId) {
  const [ratingData, setRatingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    async function fetchRatings() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:8000/gamer8/api/v1/ratings?gameId=${gameId}`,
          {
            method: 'GET',
          },
        );
        const data = await response.json();
        if (response.ok && data.body?.ratings) {
          setRatingData([...data.body.ratings]);
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
        setErrorMessage(err.message);
      }
    }
    fetchRatings();
  }, [gameId, setRatingData]);

  return [ratingData, setRatingData, isLoading, errorMessage];
}
