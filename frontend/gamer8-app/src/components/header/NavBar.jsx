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
          className="w-[25%] flex items-center justify-start pl-4 text-yellow-300"
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
      <div className="h-[100%] w-[25%] flex flex-row items-center text-primary-text-color justify-center">
        {!hasAccess ? (
          <Button onClick={() => navigateLogin()}>
            Login
          </Button>
        ) : (
          <>
            <div className=' flex flex-[2] justify-end'>
              <FaRegUserCircle
                onClick={() => {
                  navigate(`/profile/${user.id}`);
                }}
                className="h-[50px] w-[50px] text-yellow-300"
              />
            </div>
            <div className='flex flex-[2] justify-center ml-2'>
              <Button
                onClick={() => handleLogout()}
                isLoading={isLoading} // when logging out load state is true
              >
                Logout
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
