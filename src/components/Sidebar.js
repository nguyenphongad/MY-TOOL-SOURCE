import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  ArrowDownTrayIcon, 
  InformationCircleIcon,
  BookOpenIcon,
  LifebuoyIcon,
  CurrencyDollarIcon,
  KeyIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const menuItems = [
  // {
  //   title: 'Trang Chủ',
  //   path: '/',
  //   icon: HomeIcon
  // },
  {
    title: 'Tải Tool',
    path: '/download',
    icon: ArrowDownTrayIcon
  },
  {
    title: 'Hướng Dẫn Cài Tool',
    path: '/guide',
    icon: BookOpenIcon
  },
  {
    title: 'Bảng Giá',
    path: '/pricing',
    icon: CurrencyDollarIcon
  },
  {
    title: 'Hỗ Trợ',
    path: '/support',
    icon: LifebuoyIcon
  },
  {
    title: 'Giới Thiệu',
    path: '/about',
    icon: InformationCircleIcon
  },
];

const SidebarLogo = () => {
  return (
    <svg 
      viewBox="0 0 200 200" 
      xmlns="http://www.w3.org/2000/svg"
      className="sidebar-logo"
    >
      {/* Nền vuông bo tròn */}
      <rect x="0" y="0" width="200" height="200" rx="30" fill="#0B76A0" />
      
      {/* Vuông bo tròn gradient */}
      <rect x="10" y="10" width="180" height="180" rx="25" fill="#1289b8" />
      
      {/* Biểu tượng chong chóng tre */}
      <g>
        {/* Trục giữa */}
        <circle cx="100" cy="100" r="15" fill="#FFD700" /> {/* Màu vàng */}
        
        {/* Cánh chong chóng 1 - cam */}
        <path d="M100,100 L140,40 L160,60 L120,110 Z" fill="#FF6B35" />
        
        {/* Cánh chong chóng 2 - xanh da trời */}
        <path d="M100,100 L160,140 L140,160 L90,120 Z" fill="#4ECDC4" />
        
        {/* Cánh chong chóng 3 - vàng */}
        <path d="M100,100 L60,160 L40,140 L80,90 Z" fill="#FFD700" />
        
        {/* Cánh chong chóng 4 - cam */}
        <path d="M100,100 L40,60 L60,40 L110,80 Z" fill="#FF6B35" />
        
        {/* Điểm trang trí */}
        <circle cx="150" cy="50" r="5" fill="#FFFFFF" />
        <circle cx="150" cy="150" r="5" fill="#FFFFFF" />
        <circle cx="50" cy="150" r="5" fill="#FFFFFF" />
        <circle cx="50" cy="50" r="5" fill="#FFFFFF" />
        
        {/* Vòng giữa */}
        <circle cx="100" cy="100" r="10" fill="#FFFFFF" />
      </g>
    </svg>
  );
};

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-title">
            <SidebarLogo />
            <h2>MY TOOL</h2>
          </div>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <XMarkIcon className="icon" />
          </button>
        </div>
        <nav className="sidebar-menu">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => isActive ? 'active' : ''}
                >
                  <item.icon className="menu-icon" />
                  <span>{item.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      {!isOpen && (
        <button className="mobile-toggle" onClick={toggleSidebar}>
          <Bars3Icon className="icon" />
        </button>
      )}
    </>
  );
};

export default Sidebar;
