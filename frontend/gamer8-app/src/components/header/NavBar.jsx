import { useNavigate } from 'react-router-dom';
import Logo from '../ui/Logo';
import SearchBar from './SearchBar';
import useLoggedUser from '../../hooks/useLoggedUser';
import { FaRegUserCircle } from 'react-icons/fa';
import useLogout from '../../hooks/useLogout';
import Button from '../ui/buttons/Button';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import SearchedContentBox from './SearchedContentBox';
import { SearchProvider } from '../../contexts/SearchContext';

function NavBar() {
  const [hasAccess, user] = useLoggedUser();
  const { handleLogout, isLoading, isSuccess, error } =
    useLogout();
  const navigate = useNavigate();
  const windowDimensions = useWindowDimensions();

  function navigateLogin() {
    navigate('/login');
  }

  return (
    <div className="sticky top-0 z-10 mx-auto flex h-28 w-[100%] flex-row bg-cyan-950 py-4 text-center text-base">
      {windowDimensions.width > 768 && (
        <div
          id="logo-container"
          className="w-[25%] content-center justify-start text-yellow-300"
        >
          <Logo onClick={() => navigate('/')} />
        </div>
      )}
      <div
        className={`h-[100%] ${windowDimensions.width <= 768 ? 'w-[75%]' : 'w-[50%]'} content-center justify-center text-yellow-300`}
      >
        <SearchProvider>
          <SearchBar />
          <SearchedContentBox />
        </SearchProvider>
      </div>
      <div className="h-[100%] w-[25%] flex-row content-center items-center justify-center text-yellow-300">
        {!hasAccess ? (
          <Button
            onClick={() => navigateLogin()}
            width={50}
            height={50}
            bgColor="yellow"
            textColor="cyan"
            isLoading={isLoading} // No load state for this button
          >
            Login
          </Button>
        ) : (
          <>
            <FaRegUserCircle
              onClick={() => {
                navigate(`/profile/${user.id}`);
              }}
              className="my-auto h-[50%] w-[50%] text-yellow-300"
            />
            <button
              onClick={() => handleLogout()}
              className="my-auto h-fit rounded-md bg-red-700 px-2 py-2 transition-colors duration-500 hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
