import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Post from './Post';
import usePostFeed from '../hooks/usePostFeed';
import { LoginContext } from '../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';
import TabbedTable from './TabbedTable';
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
  const { user, isLoading, hasAccess } =
    useContext(LoginContext);
  const { postFeed } = usePostFeed(user);
  const [ratingFeed, setRatingFeed] = useState([])
  const navigate = useNavigate();

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

  const postContent = (
    <>
      {hasAccess && !postFeed.length ? (
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
        <div className="mb-28 mt-10 flex max-h-fit w-[100dvw] flex-col gap-10">
          {postFeed.map((post) => (
            <Post post={post} />
          ))}
        </div>
      )}
    </>
  );

  const ratingsContent = (
    <>
      {hasAccess && !ratingFeed.length ? (
        <div className="flex h-[50dvh] w-[100dvw] flex-col">
          <h2 className="mx-auto mb-10 mt-20 font-header text-4xl text-yellow-300">
            No r<span className='italic'>8 </span>tings available from your friends, right now!
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
        <div className="mb-28 mt-10 flex max-h-fit w-[100dvw] flex-col gap-10">
          {postFeed.map((post) => (
            <Post post={post} />
          ))}
        </div>
      )}
    </>
  );

  return (
    <>
      {!hasAccess && (
        <div className="flex h-[50dvh] w-[100dvw] flex-col">
          <h2 className="mx-auto mb-10 mt-20 font-header text-4xl text-yellow-300">
            Please Login to view posts and ratings!
          </h2>
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/login')}
              className="my-auto rounded-lg bg-yellow-300 px-3 py-2 font-base font-bold text-cyan-950 transition-all duration-500 hover:px-[14px] hover:py-[10px] focus:bg-yellow-400"
            >
              Go to login &rarr;
            </button>
          </div>
        </div>
      )}
      <TabbedTable
        titles={['Posts', 'Ratings']}
        content={[postContent, ratingsContent]}
      />
    </>
  );
}

export default PostFeed;
