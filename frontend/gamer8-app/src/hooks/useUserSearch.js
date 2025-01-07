import { useState } from 'react';

/**
 *
 * @param {*} searchVal the value of the user being searched such as username or fullname
 */
export default function useUserSearch(searchVal) {
  const [userResults, setUserResults] = useState(null);
  const [userFetchLoading, setUserFetchLoading] =
    useState(false);

  async function fetchUsers() {
    setUserFetchLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/users?search=${searchVal}&limit=10`,
        {
          headers: { 'Content-Type': 'application/json' },
          // must be logged user in order to get user data
          includeCredentials: true,
        },
      );
      const data = await response.json();
      setUserResults(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setUserFetchLoading(false);
    }
  }
  fetchUsers();
  return {
    userResults,
    userFetchLoading,
    userResultsCount: userResults?.length,
  };
}
