import { useNavigate } from 'react-router-dom';
import Logo from './..//universal/Logo';
import SearchBar from './../universal/SearchBar';
import useLoggedUser from '../../hooks/useLoggedUser';
import { FaRegUserCircle } from 'react-icons/fa';

function NavBar() {
  const [hasAccess, user] = useLoggedUser();
  const navigate = useNavigate();
  function navigateLogin() {
    navigate('/login');
  }

  return (
    <div className="sticky top-0 z-10 mx-auto flex h-28 w-[100%] flex-row justify-between bg-cyan-950 py-4 text-center text-base">
      <div className="mr-4 h-[100%] w-[10%] justify-center">
        <Logo
          onClick={() => navigate('/')}
          className="cursor-default font-base text-6xl font-extrabold text-yellow-300"
        />
      </div>

      <div className="h-[100%] w-[60%] content-center justify-center text-yellow-300">
        <SearchBar />
      </div>
      <div className="flex h-[100%] w-[10%] flex-row content-center justify-center text-yellow-300">
        {!hasAccess ? (
          <button
            onClick={() => navigateLogin()}
            className="h-[40%] w-[60%] rounded-md bg-yellow-300 font-base text-cyan-950"
          >
            Login
          </button>
        ) : (
          <>
            <FaRegUserCircle
              onClick={() => {
                navigate(`/profile/${user.id}`);
              }}
              className="my-auto h-[50%] w-[50%] text-yellow-300"
            />
            <button onClick={() => handleLogout()} className='bg-red-700 h-fit my-auto px-2 py-2 rounded-md hover:bg-red-600 transition-colors duration-500'>Logout</button>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
