import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';

function SearchedUserEntry({ user, setSearchVal }) {
  const navigate = useNavigate();
  function handleGameClick() {
    navigate(`/profile/${user.id}`);
    setSearchVal('');
  }
  return (
    <div
      onClick={handleGameClick}
      key={user.id}
      className="mx-auto mb-1 flex h-[45px] w-[95%] flex-row border-b-2 border-t-2 border-yellow-300 transition-colors hover:bg-cyan-800"
    >
      <div className='flex flex-[1] justify-center items-center'>
        <FaRegUserCircle className="h-[35px] w-[35px] text-yellow-300" />
      </div>
      <div className='flex flex-[3] justify-start items-center'>
        <p className="w-[70%] text-left font-base font-semibold tracking-wider">
          {user.username}
        </p>
      </div>
    </div>
  );
}

export default SearchedUserEntry;
