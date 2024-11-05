import React from 'react';
import PostForm from '../components/homepage/PostForm';
import PostFeed from '../components/homepage/PostFeed';
import { LoginProvider } from '../contexts/LoginContext';
import { PostProvider } from '../contexts/PostContext';

function HomePage() {
  return (
    <div className="h-fit w-full flex-grow overflow-auto overflow-x-hidden bg-cyan-800 scrollbar scrollbar-track-cyan-950 scrollbar-thumb-yellow-300 scrollbar-corner-yellow-300">
      <LoginProvider>
        <PostProvider>
          <PostForm />
          <hr className="skew-x-8 mx-auto w-[90dvw] rounded-lg border-2 border-yellow-300 opacity-80"></hr>
          <PostFeed />
        </PostProvider>
      </LoginProvider>
    </div>
  );
}

export default HomePage;
