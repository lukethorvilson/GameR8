import { useEffect, useState } from 'react';

/**
 * Custom hook to fetch the user profile data.
 * @param {*} userId user id of profile to fetch
 * @returns profileData, isLoading, error, setError
 */
export default function useProfilePage(userId) {
  const [profileData, setProfileData] = useState(null); // store the user data to display
  const [isLoading, setIsLoading] = useState(false); // loading state
  const [error, setError] = useState(''); // store any error that occurs, display to screen

  // effect to run when the component mounts to fetch the user profile data
  useEffect(() => {
    async function fetchUser() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:8000/gamer8/api/v1/users/${userId}`,
          {
            method: 'GET',
          },
        );
        const data = await response.json();
        setProfileData(data.body?.user);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
      }
    }
    fetchUser();
  }, [userId]);

  return { profileData, isLoading, error, setError };
}
