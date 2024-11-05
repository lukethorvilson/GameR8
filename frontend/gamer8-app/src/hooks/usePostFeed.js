import { useEffect, useState } from 'react';

export default function usePostFeed(user, limit) {
  const [postFeed, setPostFeed] = useState([]);

  useEffect(() => {
    async function fetchPostData() {
      try {
        const response = await fetch(
          `http://localhost:8000/gamer8/api/v1/posts?limit=${limit}`,
          {
            method: 'GET',
            credentials: 'include',
          },
        );
        const data = await response.json();
        if(response.ok && data.status === "success"){
          setPostFeed(data.data)
        }
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPostData();
  }, [limit]);

  return { postFeed };
}
