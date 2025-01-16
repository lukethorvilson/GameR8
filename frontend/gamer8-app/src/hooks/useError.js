import { useEffect, useState } from 'react';

export default function useError(seconds = 30) {
  const [error, setError] = useState('');

  useEffect(() => {
    if (error === '') return; // gaurd clause to prevent effect/alert from showing when the error is empty

    // set Error back to empty after a certain amount of time
    setTimeout(() => {
      setError('');
    }, seconds * 1000);
  }, [error, seconds, setError]);
  
  return { error, setError };
}
