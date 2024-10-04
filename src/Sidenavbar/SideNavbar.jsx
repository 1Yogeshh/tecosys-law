import { Explore, Man, Message, Search } from '@mui/icons-material';
import { React, useState } from 'react';
import { NavLink } from 'react-router-dom';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';

function SideNavbar() {
  const activeLinkClass = 'text-indigo-600 font-medium flex gap-1 ';
  const defaultLinkClass = 'text-gray-700 font-medium flex gap-1 ';

  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (

    <div className="relative">
      <button
        onClick={toggleDrawer}   
        className={`p-3 bg-indigo-600 hidden lg:flex  text-white rounded-md fixed z-50 transition-transform duration-300 ${
          isDrawerOpen ? 'left-[255px]' : 'left-2'} opacity-50 hover:opacity-100`}>
        <LegendToggleIcon />
      </button>

      <div className={`bg-white h-screen shadow-md flex flex-col lg:pl-[70px] pl-2 transition-transform duration-300 fixed top-0 left-0 z-40 lg:w-[250px] w-[80px] ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full '}`}>
        
        <div className='mt-[20px]'>
          <a href='/' className='lg:text-xl lg:font-bold text-lg font-medium flex flex-wrap '>Tecosys<span className='ml-1 text-indigo-600'>Law</span></a>
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

      </div>
    </div>

  );
}

export default SideNavbar;
