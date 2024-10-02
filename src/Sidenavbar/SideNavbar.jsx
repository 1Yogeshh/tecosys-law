import { Explore, Man, Message, Search } from '@mui/icons-material';
import React from 'react';
import { NavLink } from 'react-router-dom';

function SideNavbar() {
  const activeLinkClass = 'text-indigo-600 font-medium flex gap-1 ';
  const defaultLinkClass = 'text-gray-700 font-medium flex gap-1 ';

  return (
    <div className='bg-white h-screen shadow-md flex flex-col lg:pl-[70px] pl-2 '>
      <div className='mt-[20px]'>
        <p className='lg:text-xl lg:font-bold text-lg font-medium flex flex-wrap'>Te<span>cosys</span>Law</p>
      </div>

      <div className='mt-[35px] flex justify-center lg:justify-start'>
        <NavLink
          to='/casesearch'
          className={({ isActive }) => (isActive ? activeLinkClass : defaultLinkClass)}
        >
          <Search className='mr-2' /> <p className='lg:flex hidden'>Case Search</p>
        </NavLink>
      </div>
      <div className='h-[1px] lg:w-[160px] w-auto mt-4 mr-2 bg-gray-200'></div>

      <div className='mt-[25px] flex justify-center lg:justify-start'>
        <NavLink
          to='/law-chat-bot'
          className={({ isActive }) => (isActive ? activeLinkClass : defaultLinkClass)}
        >
          <Message className='mr-2' /> <p className='lg:flex hidden'>Law Chatbot</p>
        </NavLink>
      </div>
      <div className='h-[1px] lg:w-[160px] w-auto mt-4 mr-2 bg-gray-200'></div>

      <div className='mt-[25px] flex justify-center lg:justify-start'>
        <NavLink
          to='/casesummariser'
          className={({ isActive }) => (isActive ? activeLinkClass : defaultLinkClass)}
        >
          <Explore className='mr-2' /> <p className='lg:flex hidden'>Case Summariser</p>
        </NavLink>
      </div>
      <div className='h-[1px] lg:w-[160px] w-auto mt-4 mr-2 bg-gray-200'></div>
      {/* My Profile Section */}
      <div className='mt-[25px] flex justify-center lg:justify-start'>
        <NavLink
          to='/profile'
          className={({ isActive }) => (isActive ? activeLinkClass : defaultLinkClass)}
        >
          <Man className='mr-2' /> <p className='lg:flex hidden'>My Profile</p>
        </NavLink>
      </div>
    </div>
  );
}

export default SideNavbar;
