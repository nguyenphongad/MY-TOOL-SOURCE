import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  
  // Xử lý responsive khi thay đổi kích thước màn hình
  useEffect(() => {
    const handleResize = () => {
      // Mở sidebar mặc định cho màn hình lớn nếu sidebar đang đóng
      if (window.innerWidth >= 768 && !isSidebarOpen) {
        setIsSidebarOpen(true);
      }
      // Đóng sidebar mặc định cho màn hình nhỏ nếu sidebar đang mở
      else if (window.innerWidth < 768 && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };
    
    // Gắn sự kiện resize
    window.addEventListener('resize', handleResize);
    
    // Cleanup khi unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isSidebarOpen]);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  // Thêm logging để debug
  console.log('Layout rendering with children:', children);
  
  return (
    <div className={`app-container ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="content-wrapper">
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
