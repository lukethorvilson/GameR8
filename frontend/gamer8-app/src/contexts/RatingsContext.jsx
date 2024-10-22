import { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useGameRatings from '../hooks/useGameRatings';

export const RatingsContext = createContext();

export function RatingsProvider({ children }) {
  // get the page we are on's gameId
  const { id: gameId } = useParams();
  // use custom hook to get the rating data
  const [
    ratingData,
    setRatingData,
    isLoading,
    errorMessage,
  ] = useGameRatings(gameId);
  const [filteredRatings, setFilteredRatings] =
    useState(null);

  useEffect(() => {
    setFilteredRatings(
      ratingData?.filter((rating) => {
        if (rating?.title && rating?.description) {
          return true;
        } else {
          return false;
        }
      }),
    );
  }, [ratingData]);
  return (
    <RatingsContext.Provider
      value={{
        ratingData,
        setRatingData,
        filteredRatings,
        setFilteredRatings,
        isLoading,
        errorMessage,
      }}
    >
      {children}
    </RatingsContext.Provider>
  );
}
