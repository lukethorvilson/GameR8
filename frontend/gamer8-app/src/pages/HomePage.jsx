import React from 'react';
import useLoggedUser from '../hooks/useLoggedUser';
import PostForm from '../components/PostForm';
import PostFeed from '../components/PostFeed';

function HomePage() {
  const [, user] = useLoggedUser();
  return (
    <div className="h-fit w-full bg-cyan-800">
      <PostForm user={user} />
      <hr className='border-2 border-yellow-300 w-[90dvw] mx-auto rounded-lg opacity-80 skew-x-8'></hr>
      <PostFeed/>
    </div>
  );
}

export default HomePage;
