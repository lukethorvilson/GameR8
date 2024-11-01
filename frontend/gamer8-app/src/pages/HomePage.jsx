import React from 'react';
import PostForm from '../components/PostForm';
import PostFeed from '../components/PostFeed';
import { LoginProvider } from '../contexts/LoginContext';

function HomePage() {
  return (
    <div className="h-fit w-full flex-grow overflow-auto overflow-x-hidden bg-cyan-800">
      <LoginProvider>
        <PostForm />
        <hr className="skew-x-8 mx-auto w-[90dvw] rounded-lg border-2 border-yellow-300 opacity-80"></hr>
        <PostFeed />
      </LoginProvider>
    </div>
  );
}

export default HomePage;
