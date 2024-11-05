import React from 'react';
import { BiRepost } from 'react-icons/bi';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { FaRegCommentDots } from 'react-icons/fa6';
import {useNavigate} from "react-router-dom";

function Post({ post }) {
  const navigate = useNavigate();
  return (
    <div
      id="post-container"
      className="h--fit mx-auto w-[90dvw] flex-col rounded-2xl border-x-4 border-b-2 border-t-4 border-yellow-300"
    >
      <div
        id="header-container"
        className="flex h-14 w-full rounded-t-lg bg-yellow-300 text-cyan-950"
      >
        <h3 onClick={() => navigate(`/profile/${post?.UserId?.id}`)} className="my-auto ml-6 font-header cursor-pointer hover:underline text-cyan-950">
          {`@ ${post?.author}`}
        </h3>
      </div>
      <div
        id="text-container"
        className="h-fit w-full rounded-b-2xl bg-cyan-900 px-4 py-6 font-base text-yellow-300"
      >
        {post?.body}
      </div>
      <div
        id="post-actions"
        className="flex h-10 w-full flex-row items-center gap-4 pl-6"
      >
        {!post?.likesDisabled && (
          <FaRegHeart className="cursor-pointer text-2xl text-pink-500 transition-all duration-300 hover:text-[27px]" />
        )}
        {!post?.commentsDisabled && (
          <FaRegCommentDots className="cursor-pointer text-2xl text-yellow-300 transition-all duration-300 hover:text-[27px]" />
        )}
        <BiRepost className="cursor-pointer text-3xl text-yellow-300 transition-all duration-300 hover:text-[33px]" />
      </div>
    </div>
  );
}

export default Post;
