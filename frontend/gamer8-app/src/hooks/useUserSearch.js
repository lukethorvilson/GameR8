import { useEffect, useState } from 'react';

/**
 *
 * @param {*} searchVal the value of the user being searched such as username or fullname
 */
export default function useUserSearch(searchVal) {
  const [userResults, setUserResults] = useState(null);
  const [userFetchLoading, setUserFetchLoading] =
    useState(false);
  const [userResultsCount, setUserResultsCount] = useState(0);
  const [userResultsError, setUserResultsError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      if(!searchVal) {
        setUserResults([]);
        setUserResultsCount(0);
        return;
      }
      setUserFetchLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8000/gamer8/api/v1/users?search=${searchVal}&limit=10`,
          {
            headers: { 'Content-Type': 'application/json' },
            // must be logged user in order to get user data
            includeCredentials: true,
          },
        );
        if (!response.ok) {
          setUserResultsError("A network error occurred while fetching user data");
          return;
        }
        const data = await response.json();
        setUserResults(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setUserFetchLoading(false);
      }
    }
    fetchUsers();
    
  }, [searchVal]);
  return {
    userResults,
    userFetchLoading,
    userResultsCount: userResults?.length,
  };
}
