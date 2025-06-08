import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bars3Icon } from '@heroicons/react/24/outline';

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Function to get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    switch(path) {
      case '/download':
        return 'Tải Tool';
      case '/guide':
        return 'Hướng Dẫn Cài Đặt';
      case '/pricing':
        return 'Bảng Giá Key VIP';
      case '/support':
        return 'Hỗ Trợ';
      case '/about':
        return 'Giới Thiệu';
      case '/keyfree':
        return 'Key FREE';
      default:
        return 'MY TOOL';
    }
  };
  
  return (
    <header className="app-header">
      <div className="header-content">
        {!isSidebarOpen && (
          <button className="header-menu-button" onClick={toggleSidebar}>
            <Bars3Icon className="icon" />
          </button>
        )}
        <div className="header-title" onClick={() => navigate('/download')}>
          <h1>{getPageTitle()}</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
