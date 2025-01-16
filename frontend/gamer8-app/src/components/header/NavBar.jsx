import { useNavigate } from 'react-router-dom';
import Logo from '../ui/Logo';
import SearchBar from './SearchBar';
import { FaRegUserCircle } from 'react-icons/fa';
import useLogout from '../../hooks/auth/useLogout';
import Button from '../ui/buttons/Button';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import SearchedContentBox from './SearchedContentBox';
import { SearchProvider } from '../../contexts/SearchContext';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';

function NavBar() {
  const {user, isAuthenticated } = useContext(AuthContext);
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
          onClick={() => navigate('/')}
          className="flex w-[25%] items-center justify-start pl-4 text-yellow-300"
        >
          <Logo />
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
      <div className="flex h-[100%] w-[25%] flex-row items-center justify-end pr-4 text-primary-text-color">
        {!isAuthenticated ? (
          <Button onClick={() => navigateLogin()}>
            Login
          </Button>
        ) : (
          <>
            <div className="flex flex-[2] justify-end">
              <FaRegUserCircle
                onClick={() => {
                  navigate(`/profile/${user.id}`);
                }}
                className="h-[20px] w-[20px] text-yellow-300 transition-all duration-300 sm:h-[30px] sm:w-[30px] md:h-[40px] md:w-[40px] lg:h-[50px] lg:w-[50px]"
              />
            </div>
            <div className="ml-2 flex flex-[2] justify-center">
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
