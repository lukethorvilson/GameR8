import { useState } from 'react';

export default function useLogout() {
  const [error, setError] = useState();
  async function handleLogout() {
    try {
      const response = await fetch(
        'http://localhost:8000/gamer8/api/v1/users/logout',
        {
          method: 'POST',
          credentials: 'include',
        },
      );
      
    } catch (err) {}
  }

  return { handleLogout, error };
}
