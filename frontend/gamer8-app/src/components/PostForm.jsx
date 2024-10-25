import React from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { IoSend } from 'react-icons/io5';
import { CiShoppingTag } from 'react-icons/ci';
import {
  LiaCommentSolid,
  LiaCommentSlashSolid,
} from 'react-icons/lia';
import { RiDislikeFill } from 'react-icons/ri';
import { FaHeart, FaLock } from 'react-icons/fa';
import usePostForm from '../hooks/usePostForm';

function PostForm({ user }) {
  const {
    commentsDisabled,
    likesDisabled,
    textArea,
    setTextArea,
    handleDisableComments,
    handleDisableLikes,
    handleSubmit,
    isAuth,
  } = usePostForm();

  return (
    <div id="form-container" className="h-fit w-full">
      <form
        id="post-form"
        className="flex flex-col"
        onSubmit={() => {
          console.log(`${user.fullName} posted something`);
        }}
      >
        <label
          htmlFor="postBody"
          className="mb-3 ml-6 mt-6 font-header text-3xl text-yellow-300"
        >
          Write a post!
        </label>
        <div className="relative flex h-fit w-fit flex-col">
          <textarea
            name="postBody"
            id="post-body"
            value={textArea}
            onChange={(e) => setTextArea(e.target.value)}
            className="mb-1 ml-6 h-[18dvh] w-[80dvw] overflow-y-auto rounded-t-lg border-yellow-300 bg-cyan-700 px-4 py-2 font-base text-yellow-300 placeholder-yellow-300 placeholder-opacity-70 ring-2 ring-yellow-400 focus:border-transparent focus:shadow-[0_-2px_0_0_transparent] focus:outline-none focus:ring-4 focus:ring-yellow-300"
            placeholder="Post something for your friends to see!"
          />
          <div className="mb-6 ml-6 flex h-[7dvh] w-[80dvw] flex-row items-center justify-between rounded-b-lg bg-cyan-800 px-5 py-3 ring-2 ring-yellow-400">
            <div className="my-5 flex flex-row gap-6">
              <BiImageAdd className="cursor-pointer text-3xl text-yellow-300 hover:text-4xl" />
              <CiShoppingTag className="cursor-pointer text-3xl text-yellow-300 hover:text-4xl" />
              {likesDisabled ? (
                <RiDislikeFill
                  className="cursor-pointer text-3xl text-yellow-300 hover:text-4xl"
                  onClick={handleDisableLikes}
                />
              ) : (
                <FaHeart
                  className="cursor-pointer text-3xl text-yellow-300 hover:text-4xl"
                  onClick={handleDisableLikes}
                />
              )}
              {commentsDisabled ? (
                <LiaCommentSlashSolid
                  className="cursor-pointer text-3xl text-yellow-300 hover:text-4xl"
                  onClick={handleDisableComments}
                />
              ) : (
                <LiaCommentSolid
                  className="cursor-pointer text-3xl text-yellow-300 hover:text-4xl"
                  onClick={handleDisableComments}
                />
              )}
            </div>
            <button
              type="submit"
              className="rounded-md p-1 transition-colors hover:bg-cyan-900"
              onSubmit={handleSubmit}
              disabled={!isAuth}
            >
              {isAuth ? (
                <IoSend className="mr-1 cursor-pointer rounded-lg p-1 text-3xl text-yellow-300 transition-colors" />
              ) : (
                <FaLock className="mr-1 cursor-pointer rounded-lg p-1 text-3xl text-yellow-300 opacity-70 transition-colors" />
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
