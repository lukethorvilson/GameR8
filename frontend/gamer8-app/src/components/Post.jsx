import React from 'react';
import { BiRepost } from "react-icons/bi";

function Post({ post }) {
  return (
    <div
      id="post-container"
      className="h--fit mx-auto w-[80dvw] flex-col rounded-2xl border-x-4 border-b-2 border-t-4 border-yellow-300"
    >
      <div
        id="header-container"
        className="flex h-14 w-full rounded-t-lg bg-yellow-300 text-cyan-950"
      >
        <h3 className="my-auto ml-6 font-header text-cyan-950">
          {post?.user.username}
        </h3>
      </div>
      <div
        id="text-container"
        className="h-fit w-full rounded-b-2xl bg-cyan-900 px-4 py-6 font-base text-yellow-300"
      >
        {post?.postBody}
      </div>
      <div id="post-actions" className='w-full h-10 flex flex-row gap-4'>
        {!post?.likesDisabled && <p>Repost icon</p>}
        <BiRepost className='text-yellow-300 '/>
      </div>
    </div>
  );
}

export default Post;
