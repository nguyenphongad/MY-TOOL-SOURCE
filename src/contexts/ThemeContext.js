import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// Tạo context
export const ThemeContext = createContext();

// Custom hook để sử dụng ThemeContext
export const useTheme = () => useContext(ThemeContext);

// Theme Provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('default'); // default, root, hoặc admin
  const { user, isAuthenticated } = useSelector(state => state.auth);

  // Cập nhật theme dựa vào role của user
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'root') {
        setTheme('root');
        document.documentElement.setAttribute('data-theme', 'root');
        document.documentElement.classList.remove('theme-admin', 'theme-default');
        document.documentElement.classList.add('theme-root');
      } else if (user.role === 'admin') {
        setTheme('admin');
        document.documentElement.setAttribute('data-theme', 'admin');
        document.documentElement.classList.remove('theme-root', 'theme-default');
        document.documentElement.classList.add('theme-admin');
      } else {
        setTheme('default');
        document.documentElement.setAttribute('data-theme', 'default');
        document.documentElement.classList.remove('theme-root', 'theme-admin');
        document.documentElement.classList.add('theme-default');
      }
    } else {
      setTheme('default');
      document.documentElement.setAttribute('data-theme', 'default');
      document.documentElement.classList.remove('theme-root', 'theme-admin');
      document.documentElement.classList.add('theme-default');
    }
  }, [isAuthenticated, user]);

  // Cung cấp context cho toàn bộ ứng dụng
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
