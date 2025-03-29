import React from 'react';
import { MdSearch, MdOutlineSettings, MdNotificationsNone, MdMenu } from 'react-icons/md';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const location = useLocation();
  const pageTitle = location.pathname === '/' ? 'Overview' : 
    location.pathname.slice(1).split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');

  return (
    <header className="bg-white shadow-sm">
      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* First Line */}
        <div className="h-16 flex items-center justify-between px-4">
          <button 
            onClick={onMenuClick}
            className="w-10 h-10 rounded-full bg-[#F5F7FA] flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <MdMenu size={24} className="text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-[#343C6A]">{pageTitle}</h1>
          <div className='w-[50px]'>
            <button className="p-0 rounded-full bg-[#F5F7FA] flex items-center justify-center hover:opacity-80 duration-300">
              <img src='/images/avatar.png' alt='avatar' className='w-[50px] h-[50px] rounded-full' />
            </button>
          </div>
        </div>
        {/* Second Line - Search */}
        <div className="h-16 flex items-center justify-center px-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search for something"
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-gray-300 bg-[#F5F7FA] placeholder-[#8BA3CB]"
            />
            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8BA3CB]" size={20} />
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center md:p-6 px-6 py-2">
        <div className="flex items-center justify-between w-full">
          {/* Left side - Page Title */}
          <h1 className="text-2xl font-semibold text-[#343C6A]">{pageTitle}</h1>

          {/* Right side - Search and Icons */}
          <div className="flex items-center space-x-6">
            {/* Search Box */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search for something"
                className="w-64 pl-10 pr-4 py-3 rounded-full focus:border focus:outline-none focus:border-gray-300 bg-[#F5F7FA] placeholder-[#8BA3CB]"
              />
              <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8BA3CB]" size={20} />
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <button className="p-3 rounded-full bg-[#F5F7FA] flex items-center justify-center hover:bg-gray-100 transition-colors">
                <MdOutlineSettings size={26} className="text-[#718EBF]" />
              </button>
              <button className="p-3 rounded-full bg-[#F5F7FA] flex items-center justify-center hover:bg-gray-100 transition-colors relative">
                <MdNotificationsNone size={26} className="text-[#396AFF]" />
                <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 rounded-full border border-[#396AFF] bg-[#F5F7FA] border-2">
                </span>
              </button>
              <div className='w-[50px]'>
                <button className="p-0 rounded-full bg-[#F5F7FA] flex items-center justify-center hover:opacity-80 duration-300">
                  <img src='/images/avatar.png' alt='avatar' className='w-[50px] h-[50px] rounded-full' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 