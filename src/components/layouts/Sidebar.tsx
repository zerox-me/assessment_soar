import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MdHome,
  MdSwapHoriz,
  MdAccountBalance,
  MdTrendingUp,
  MdCreditCard,
  MdAccountBalanceWallet,
  MdMiscellaneousServices,
  MdWorkspaces,
  MdSettings,
  MdClose
} from 'react-icons/md';
import { IconType } from 'react-icons';

interface NavItem {
  icon: IconType;
  label: string;
  path: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems: NavItem[] = [
  { icon: MdHome, label: 'Dashboard', path: '/' },
  { icon: MdSwapHoriz, label: 'Transactions', path: '/transactions' },
  { icon: MdAccountBalance, label: 'Accounts', path: '/accounts' },
  { icon: MdTrendingUp, label: 'Investments', path: '/investments' },
  { icon: MdCreditCard, label: 'Credit Cards', path: '/credit-cards' },
  { icon: MdAccountBalanceWallet, label: 'Loans', path: '/loans' },
  { icon: MdMiscellaneousServices, label: 'Services', path: '/services' },
  { icon: MdWorkspaces, label: 'My Privileges', path: '/privileges' },
  { icon: MdSettings, label: 'Settings', path: '/settings' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeNavIndex = navItems.findIndex(item => item.path === location.pathname);
  const [hoveredIndex, setHoveredIndex] = useState<number>(activeNavIndex);

  useEffect(() => {
    setHoveredIndex(activeNavIndex);
  }, [activeNavIndex]);

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose(); // Close sidebar on mobile after navigation
  };

  const renderNavItem = (item: NavItem, index: number) => {
    return (
      <li 
        key={item.path}
        className="relative w-full py-1"
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(activeNavIndex)}
      >
        <button
          onClick={() => handleNavigation(item.path)}
          className={`w-full flex items-center space-x-3 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 ${
            activeNavIndex === index ? 'text-label-primary bg-gray-100' : 'text-label-tertiary'
          }`}
        >
          <span className={activeNavIndex === index ? 'text-label-primary' : 'text-label-tertiary'}>
            <item.icon size={24} />
          </span>
          <span>{item.label}</span>
        </button>
      </li>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        bg-white w-64 min-h-screen flex flex-col border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Logo/Brand Section */}
        <div className="p-6 pl-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <svg width="25" height="31" viewBox="0 0 25 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M16.875 0.916668C17.387 0.916681 17.8899 1.05146 18.3333 1.30745C18.7767 1.56344 19.1448 1.93162 19.4008 2.375H21.25C22.0235 2.375 22.7654 2.68229 23.3124 3.22927C23.8594 3.77625 24.1667 4.51812 24.1667 5.29167V22.7917C24.1667 24.7255 23.3984 26.5802 22.031 27.9477C20.6635 29.3151 18.8089 30.0833 16.875 30.0833H3.75C2.97645 30.0833 2.23458 29.776 1.6876 29.2291C1.14062 28.6821 0.833332 27.9402 0.833332 27.1667V5.29167C0.833332 4.51812 1.14062 3.77625 1.6876 3.22927C2.23458 2.68229 2.97645 2.375 3.75 2.375H5.59917C5.85515 1.93162 6.22333 1.56344 6.66671 1.30745C7.11008 1.05146 7.61303 0.916681 8.125 0.916668H16.875ZM16.6183 11.6777L10.4321 17.8654L8.36854 15.8019C8.0935 15.5362 7.72512 15.3892 7.34275 15.3926C6.96038 15.3959 6.59461 15.5493 6.32422 15.8196C6.05383 16.09 5.90046 16.4558 5.89714 16.8382C5.89382 17.2205 6.04081 17.5889 6.30646 17.864L9.29604 20.855C9.44501 21.004 9.62189 21.1223 9.81656 21.2029C10.0112 21.2836 10.2199 21.3251 10.4306 21.3251C10.6413 21.3251 10.85 21.2836 11.0447 21.2029C11.2394 21.1223 11.4162 21.004 11.5652 20.855L18.6819 13.7398C18.8173 13.6043 18.9247 13.4435 18.9979 13.2665C19.0711 13.0895 19.1088 12.8998 19.1087 12.7082C19.1087 12.5167 19.0709 12.327 18.9975 12.1501C18.9241 11.9731 18.8166 11.8124 18.6811 11.677C18.5457 11.5416 18.3848 11.4342 18.2078 11.361C18.0308 11.2877 17.8411 11.2501 17.6496 11.2501C17.458 11.2502 17.2684 11.288 17.0914 11.3614C16.9145 11.4347 16.7537 11.5422 16.6183 11.6777ZM16.1458 3.83333H8.85417C8.6835 3.83328 8.51823 3.89308 8.38712 4.00234C8.25601 4.1116 8.16739 4.26338 8.13667 4.43125L8.125 4.5625V6.02083C8.12494 6.1915 8.18475 6.35677 8.294 6.48788C8.40326 6.61899 8.55504 6.70762 8.72292 6.73833L8.85417 6.75H16.1458C16.3165 6.75006 16.4818 6.69025 16.6129 6.581C16.744 6.47174 16.8326 6.31996 16.8633 6.15208L16.875 6.02083V4.5625C16.8751 4.39184 16.8152 4.22656 16.706 4.09546C16.5967 3.96435 16.445 3.87572 16.2771 3.845L16.1458 3.83333Z" fill="#232323"/>
              </svg>
              <h2 className="text-2xl font-bold text-label-title">Soar Task</h2>
            </div>
            {/* Close button for mobile */}
            <button 
              onClick={onClose}
              className="md:hidden w-10 h-10 rounded-full bg-label-icon flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <MdClose size={24} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 py-4">
          <div className='relative'>
            <ul className="w-full">
              {navItems.map((item, index) => renderNavItem(item, index))}
            </ul>
            {/* Black line indicator */}
            <div className={`absolute left-0 w-1 h-14 bg-label-primary transition-all duration-300 ease-in-out rounded-r-lg`}
              style={{top: `${(hoveredIndex ?? 0) * 56}px`}}
              />
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar; 