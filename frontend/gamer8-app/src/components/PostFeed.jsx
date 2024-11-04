import React, { useEffect, useRef, useState } from 'react';
import Post from './Post';
const EMPTY = [];
const ONE = [
  {
    user: {
      id: 1,
      username: 'lukethor08',
    },
    postBody:
      'Some dope caption that this post will have about some random topic or something game related.',
    mediaList: [],
    likesDisabled: false,
    commentsDisabled: false,
    likes: 0,
    comments: [],
    tags: [],
  },
];

const MANY = [
  {
    user: {
      id: 1,
      username: 'lukethor08',
    },
    postBody:
      'Some dope caption that this post will have about some random topic or something game related. ',
    mediaList: [],
    likesDisabled: false,
    commentsDisabled: true,
    tags: [],
  },
  {
    user: {
      id: 2,
      username: 'Pookie',
    },
    postBody:
      "Some other dope caption that this post will have about some random topic or something game related. With GameR8, were changing the way players discover and review games. Imagine a platform that not only curates top titles but also brings you insights from gamers just like you! Whether you're looking for a fresh RPG to lose yourself in or a quick indie gem to play on the go, GameR8 has it all. Rate your favorites, leave feedback, and see what the community thinks—no more wasted downloads or hours of uninspired gameplay. Join us, make your voice heard, and let's create a gaming hub where every rating and review truly counts. 🕹️ #GameR8 #GamingCommunity #RateYourGames #LevelUp",
    mediaList: [],
    likesDisabled: false,
    commentsDisabled: true,
    tags: [],
  },
];
const WINK_TIME = 1;

function PostFeed() {
  const [postFeed] = useState([]);
  
  /**
   * Created a small wink animation when there are no posts found
   */
  //////////////////////////////////////////////
  const [wink, setWink] = useState(true);
  let intervalId = useRef();
  useEffect(() => {
    intervalId.current = setInterval(() => {
      setWink((cur) => !cur);
    }, WINK_TIME * 1000);
    return function () {
      clearInterval(intervalId.current);
    };
  }, [setWink]);
  ///////////////////////////////////////////////

  return (
    <>
      {!postFeed.length ? (
        <div className="flex h-[50dvh] w-[100dvw] flex-col">
          <h2 className="mx-auto mb-10 mt-20 font-header text-4xl text-yellow-300">
            No posts available from friends or creators!
          </h2>
          {wink ? (
            <h4 className="mx-auto font-header text-6xl text-yellow-300">
              {`(*>﹏<*)`}
            </h4>
          ) : (
            <h4 className="mx-auto font-header text-6xl text-yellow-300">
              {`(*＾-＾*)`}
            </h4>
          )}
        </div>
      ) : (
        <div className="mt-10 mb-28 flex max-h-fit w-[100dvw] flex-col gap-10">
          {postFeed.map((post) => (
            <Post post={post} />
          ))}
        </div>
      )}
    </>
  );
}

export default PostFeed;
