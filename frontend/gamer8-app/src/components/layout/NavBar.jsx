import { useNavigate } from 'react-router-dom';
import Logo from './..//universal/Logo';
import SearchBar from './../universal/SearchBar';
import useLoggedUser from '../../hooks/useLoggedUser';
import { FaRegUserCircle } from 'react-icons/fa';

function NavBar() {
  const [hasAccess, user] = useLoggedUser();
  console.log(hasAccess);
  const navigate = useNavigate();
  function navigateLogin() {
    navigate('/login');
  }

  return (
    <div className="sticky top-0 z-10 mx-auto flex h-28 w-[100%] flex-row justify-between bg-cyan-950 py-4 text-center text-base">
      <div className="h-[100%] w-[10%] justify-center mr-4">
        <Logo
          onClick={() => navigate('/')}
          className="cursor-default font-base text-6xl font-extrabold text-yellow-300"
        />
      </div>

      <div className="h-[100%] w-[60%] content-center justify-center text-yellow-300">
        <SearchBar />
      </div>
      <div className="h-[100%] w-[10%] content-center justify-center text-yellow-300">
        {!hasAccess ? (
          <button
            onClick={() => navigateLogin()}
            className="h-[40%] w-[60%] rounded-md bg-yellow-300 font-base text-cyan-950"
          >
            Login
          </button>
        ) : (
          <FaRegUserCircle
            onClick={() => {
              navigate(`/profile/${user.id}`);
            }}
            className="mx-auto h-[50%] w-[50%] text-yellow-300"
          />
        )}
      </div>
    </div>
  );
}

export default NavBar;
