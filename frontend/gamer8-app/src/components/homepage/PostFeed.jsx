import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Post from './Post';
import { LoginContext } from '../../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';
import TabbedTable from './TabbedTable';
import { PostContext } from '../../contexts/PostContext';

const WINK_TIME = 1;

function PostFeed() {
  const { hasAccess } = useContext(LoginContext);
  const { postData } = useContext(PostContext);
  const [ratingFeed] = useState([]);
  const navigate = useNavigate();
  /**
   * Created a small wink animation when there are no posts found
   */
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
      {hasAccess && !postData.length ? (
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
          {postData.map((post, i) => (
            <Post key={i} post={post} />
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
            No r<span className="italic">8 </span>tings
            available from your friends, right now!
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
          {ratingFeed.map((rating) => (
            <p>Rating</p>
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
      {hasAccess && (
        <TabbedTable
          titles={['Posts', 'Ratings']}
          content={[postContent, ratingsContent]}
        />
      )}
    </>
  );
}

export default PostFeed;
