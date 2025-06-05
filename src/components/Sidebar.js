import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  ArrowDownTrayIcon, 
  InformationCircleIcon,
  BookOpenIcon,
  LifebuoyIcon,
  CurrencyDollarIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const menuItems = [
  {
    title: 'Trang Chủ',
    path: '/',
    icon: HomeIcon
  },
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

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>MY TOOL</h2>
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
