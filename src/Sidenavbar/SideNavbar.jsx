import { Explore, Man, Message, Search } from '@mui/icons-material';
import React from 'react';
import { NavLink } from 'react-router-dom';

function SideNavbar() {
  const activeLinkClass = 'text-indigo-600 font-medium';
  const defaultLinkClass = 'text-gray-700 font-medium';

  return (
    <div className='bg-white h-screen shadow-md flex flex-col pl-[70px] '>
      <div className='mt-[20px]'>
        <p className='text-xl font-bold'>Te<span>cosys</span>Law</p>
      </div>

      <div className='mt-[35px]'>
        <NavLink
          to='/casesearch'
          className={({ isActive }) => (isActive ? activeLinkClass : defaultLinkClass)}
        >
          <Search className='mr-2' /> Case Search
        </NavLink>
      </div>
      <div className='h-[1px] w-[160px] mt-4 bg-gray-200'></div>

      <div className='mt-[25px]'>
        <NavLink
          to='/law-chat-bot'
          className={({ isActive }) => (isActive ? activeLinkClass : defaultLinkClass)}
        >
          <Message className='mr-2' /> Law Chatbot
        </NavLink>
      </div>
      <div className='h-[1px] w-[160px] mt-4 bg-gray-200'></div>

      <div className='mt-[25px]'>
        <NavLink
          to='/casesummariser'
          className={({ isActive }) => (isActive ? activeLinkClass : defaultLinkClass)}
        >
          <Explore className='mr-2' /> Case Summariser
        </NavLink>
      </div>
      <div className='h-[1px] w-[160px] mt-4 bg-gray-200'></div>
      <div className='mt-[25px]'>
        <NavLink
          to='/profile'
          className={({ isActive }) => (isActive ? activeLinkClass : defaultLinkClass)}
        >
          <Man className='mr-2' /> My Profile
        </NavLink>
      </div>
    </div>
  );
}

export default SideNavbar;
