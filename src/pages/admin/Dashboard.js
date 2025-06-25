import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  KeyIcon,
  CurrencyDollarIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import PageTransition from '../../components/PageTransition';
import { itemVariants } from '../../components/AnimationConfig';

const AdminDashboard = () => {
  const stats = [
    { 
      title: 'Key VIP đã bán', 
      value: '256', 
      icon: KeyIcon,
      subInfo: {
        text: 'Có 7 key VIP đã hết hạn',
        type: 'warning'
      }
    },
    { 
      title: 'Doanh thu tháng 7/2025', 
      value: 800000, // Đã sửa thành số thay vì chuỗi
      icon: CurrencyDollarIcon,
      subInfo: {
        text: '+30% so với tháng trước',
        type: 'positive'
      }
    },
    { 
      title: 'Tổng người dùng', 
      value: '80', 
      icon: UserGroupIcon,
      subInfo: {
        text: '9 người dùng mới hôm nay',
        type: 'info'
      }
    }
  ];

  // Hàm format số thành định dạng có dấu phẩy ngăn cách phần nghìn
  const formatNumber = (num) => {
    if (typeof num === 'number') {
      return num.toLocaleString('vi-VN') + ' VND';
    }
    return num;
  };

  return (
    <PageTransition>
      <motion.h1 
        className="page-title"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Dashboard
      </motion.h1>

      {/* Thống kê chung */}
      <motion.div 
        className="stats-grid"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.02 }}
      >
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-icon">
              <stat.icon />
            </div>
            <div className="stat-info">
              <h3>{stat.title}</h3>
              <div className="stat-value">
                {typeof stat.value === 'number' ? formatNumber(stat.value) : stat.value}
                {stat.subInfo && (
                  <div className={`stat-sub-info ${stat.subInfo.type}`}>
                    {stat.subInfo.type === 'warning' && <ExclamationCircleIcon className="sub-info-icon" />}
                    {stat.subInfo.text}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Biểu đồ và dữ liệu */}
      <motion.div 
        className="dashboard-content"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.05 }}
      >
        <div className="dashboard-section">
          <h2>
            <ChartBarIcon className="section-icon" />
            Thống kê gần đây
          </h2>
          <div className="dashboard-chart">
            {/* Đây là nơi sẽ thêm biểu đồ trong tương lai */}
            <div className="chart-placeholder">
              <p>Biểu đồ thống kê sẽ được hiển thị ở đây</p>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Hoạt động gần đây</h2>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-time">10:30 AM</div>
              <div className="activity-details">
                <h4>Bán key VIP</h4>
                <p>Key MY_TOOL_VIP_1M đã được bán cho user123</p>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-time">9:15 AM</div>
              <div className="activity-details">
                <h4>Đăng ký mới</h4>
                <p>Người dùng mới newuser456 đã đăng ký</p>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-time">Yesterday</div>
              <div className="activity-details">
                <h4>Cập nhật phiên bản</h4>
                <p>Phiên bản MY_TOOL_V2.5 đã được phát hành</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </PageTransition>
  );
};

export default AdminDashboard;
