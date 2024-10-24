import React from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { IoSend } from 'react-icons/io5';
import { CiShoppingTag } from 'react-icons/ci';
function PostForm({ user }) {
  return (
    <div
      id="form-container"
      className="h-fit w-full bg-cyan-800"
    >
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
        <textarea
          name="postBody"
          id="post-body"
          className="ml-6 h-24 w-[80%]  overflow-y-auto rounded-t-lg bg-cyan-700 px-4 py-2 font-base text-yellow-300 placeholder-yellow-300 placeholder-opacity-70 ring-2 focus:ring-4 border-yellow-300 focus:border-transparent focus:ring-yellow-300 ring-yellow-300"
          placeholder="Post something for your friends to see!"
        ></textarea>
        <div className="mb-6 ml-6 flex h-16 w-[80%] flex-row items-center justify-between rounded-b-lg bg-cyan-800 px-5 py-3 ring-2 ring-yellow-300">
          <div className='flex flex-row gap-4 my-5'>
            <BiImageAdd className="text-3xl text-yellow-300 hover:text-4xl cursor-pointer" />
            <CiShoppingTag className="text-3xl text-yellow-300 hover:text-4xl cursor-pointer" />
          </div>
          <button type="submit" className='hover:bg-cyan-950'><IoSend className="text-3xl cursor-pointer text-yellow-300  transition-colors mr-1 p-1 rounded-lg" /></button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
