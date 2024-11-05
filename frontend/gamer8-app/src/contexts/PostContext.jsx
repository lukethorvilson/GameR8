import { createContext, useEffect, useState } from 'react';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [postData, setPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  useEffect(() => {
    async function fetchPostData() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:8000/gamer8/api/v1/posts`,
          {
            method: 'GET',
            credentials: 'include',
          },
        );
        const data = await response.json();
        setIsLoading(false);
        if (response.ok && data.status === 'success') {
          setPostData(data.data);
        } else {
          setIsError(
            data?.data?.message ||
              'There was an error fetching posts!',
          );
        }
      } catch (err) {
        setIsLoading(false);
        setIsError(err.message);
      }
    }
    fetchPostData();
  }, []);

  return (
    <PostContext.Provider
      value={{ postData, setPostData, isLoading, isError }}
    >
      {children}
    </PostContext.Provider>
  );
};
