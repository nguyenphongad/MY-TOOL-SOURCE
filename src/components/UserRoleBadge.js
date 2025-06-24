import React from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '../contexts/ThemeContext';
import { WrenchIcon } from '@heroicons/react/24/solid';

const UserRoleBadge = () => {
  const { user, isAuthenticated } = useSelector(state => state.auth);

  // Chỉ hiển thị badge cho vai trò root và admin
  if (!isAuthenticated || !user || (user.role !== 'root' && user.role !== 'admin')) {
    return null;
  }
  
  // Cấu hình hiển thị cho từng role
  const roleConfig = {
    root: {
      display: 'ROOT',
      className: 'root'
    },
    admin: {
      display: 'ADMIN',
      className: 'admin'
    }
  };

  const { display, className } = roleConfig[user.role];

  return (
    <div className={`user-role-badge ${className}`}>
      <WrenchIcon className="role-icon" />
      <span className="role-text">{display}</span>
    </div>
  );
};

export default UserRoleBadge;
