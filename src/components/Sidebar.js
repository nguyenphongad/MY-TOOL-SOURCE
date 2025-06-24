import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  HomeIcon, 
  ArrowDownTrayIcon, 
  InformationCircleIcon,
  BookOpenIcon,
  LifebuoyIcon,
  CurrencyDollarIcon,
  KeyIcon,
  UserGroupIcon,
  Cog8ToothIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import MyToolLogo from './MyToolLogo';
import UserRoleBadge from './UserRoleBadge';

// Danh sách menu theo nhóm và phân quyền
const LIST_MENU_ROLE = [
  {
    groupName: "Công khai",
    role: ["*"], // * nghĩa là tất cả vai trò đều có thể thấy
    items: [
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
      }
    ]
  },
  {
    groupName: "Admin",
    role: ["admin", "root"], // Chỉ admin và root mới thấy
    items: [
      {
        title: 'Bảng điều khiển',
        path: '/dashboard',
        icon: ChartBarIcon
      },
      {
        title: 'Bán key',
        path: '/manage/sell-keys',
        icon: KeyIcon
      }
    ]
  },
  {
    groupName: "Root",
    role: ["root"], // Chỉ root mới thấy
    items: [
      {
        title: 'Quản lý Admin',
        path: '/system/admins',
        icon: ShieldCheckIcon
      },
      {
        title: 'Quản lý bảng giá',
        path: '/system/manage-pricing',
        icon: Cog8ToothIcon
      },
      {
        title: 'Quản lý thành viên',
        path: '/manage/members',
        icon: UserGroupIcon
      },
    ]
  }
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
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const userRole = user?.role || "guest";

  // Handler to close sidebar when menu item is clicked (especially useful on mobile)
  const handleMenuItemClick = () => {
    // Check if we're on mobile by screen width or if sidebar is manually opened
    const isMobileOrManualOpen = window.innerWidth < 768;
    if (isMobileOrManualOpen) {
      toggleSidebar(); // Close sidebar
    }
  };

  // Kiểm tra xem người dùng có quyền xem nhóm menu này không
  const canViewGroup = (groupRoles) => {
    if (groupRoles.includes("*")) return true;
    if (!isAuthenticated) return false;
    return groupRoles.includes(userRole);
  };

  // Xác định class CSS dựa trên role của group
  const getGroupClassName = (groupRoles) => {
    if (groupRoles.includes("root") && !groupRoles.includes("*")) {
      return "menu-group root-group";
    } else if (groupRoles.includes("admin") && !groupRoles.includes("*") && !groupRoles.includes("root")) {
      return "menu-group admin-group";
    }
    return "menu-group public-group"; // Thêm class public-group rõ ràng
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="sidebar-title">
          <MyToolLogo className="sidebar-logo" />
          <h2>MY TOOL</h2>
        </div>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <XMarkIcon className="icon" />
        </button>
      </div>
      
      {/* Hiển thị badge role nếu đã đăng nhập */}
      {isAuthenticated && <UserRoleBadge />}
      
      <nav className="sidebar-menu">
        {LIST_MENU_ROLE.map((group, groupIndex) => (
          canViewGroup(group.role) && (
            <div key={groupIndex} className={getGroupClassName(group.role)}>
              <div className="group-name">{group.groupName}</div>
              <ul>
                {group.items.map((item, index) => (
                  <li key={index}>
                    <NavLink 
                      to={item.path} 
                      className={({ isActive }) => isActive ? 'active' : ''}
                      onClick={handleMenuItemClick}
                    >
                      <item.icon className="menu-icon" />
                      <span>{item.title}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
              {groupIndex < LIST_MENU_ROLE.length - 1 && canViewGroup(LIST_MENU_ROLE[groupIndex + 1].role) && (
                <div className="menu-divider"></div>
              )}
            </div>
          )
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
