import { useState } from 'react';

export default function useLogout() {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  async function handleLogout() {
    try {
      setLoading(true);
      const response = await fetch(
        'http://localhost:8000/gamer8/api/v1/users/logout',
        {
          method: 'POST',
          credentials: 'include',
        },
      );
      if (!response.ok) {
        setLoading(false);
        setError('Error logging out');
        setIsSuccess(false);
      }
      else{
        const data = await response.json();
        setLoading(false);
        setIsSuccess(true);
        setError(null);
      }
      
    } catch (err) {
      setError(`Error logging out: ${err.message}`);
      setIsSuccess(false);
      setLoading(false);
    }
  }

  return { handleLogout, isLoading, isSuccess, error };
}
