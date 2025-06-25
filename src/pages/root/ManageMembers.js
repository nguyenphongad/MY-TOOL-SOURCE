import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  UserGroupIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  XCircleIcon,
  CheckBadgeIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { toast } from 'sonner';
import PageTransition from '../../components/PageTransition';
import { itemVariants } from '../../components/AnimationConfig';

// Dữ liệu mẫu - Trong thực tế, lấy từ API
const sampleMembers = [
  { id: 1, username: 'user123', email: 'user123@example.com', fullName: 'Nguyễn Văn X', isActive: true, createdAt: '2023-05-15', lastLogin: '2023-06-20', keysCount: 2 },
  { id: 2, username: 'user456', email: 'user456@example.com', fullName: 'Trần Thị Y', isActive: false, createdAt: '2023-04-10', lastLogin: '2023-06-15', keysCount: 1 },
  { id: 3, username: 'user789', email: 'user789@example.com', fullName: 'Lê Văn Z', isActive: true, createdAt: '2023-06-05', lastLogin: '2023-06-22', keysCount: 0 },
  { id: 4, username: 'user012', email: 'user012@example.com', fullName: 'Phạm Thị W', isActive: true, createdAt: '2023-06-18', lastLogin: null, keysCount: 0 }
];

const ManageMembers = () => {
  const [membersData, setMembersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showMemberDetail, setShowMemberDetail] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Mô phỏng tải dữ liệu - trong thực tế, gọi API
    setTimeout(() => {
      setMembersData(sampleMembers);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleViewDetail = (member) => {
    setSelectedMember(member);
    setShowMemberDetail(true);
  };

  const closeDetail = () => {
    setShowMemberDetail(false);
    setSelectedMember(null);
  };

  const toggleStatus = (id) => {
    setMembersData(prev => prev.map(member => 
      member.id === id ? { ...member, isActive: !member.isActive } : member
    ));
    
    const member = membersData.find(m => m.id === id);
    toast.success(`Đã ${member.isActive ? 'vô hiệu hóa' : 'kích hoạt'} tài khoản thành viên!`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Trong thực tế, có thể gọi API search ở đây
    toast.info(`Đang tìm kiếm thành viên với từ khóa: ${searchTerm}`);
  };

  const filteredMembers = membersData.filter(member => {
    // Lọc theo trạng thái
    const statusMatch = filterStatus === "all" || 
      (filterStatus === "active" ? member.isActive : !member.isActive);
    
    // Lọc theo từ khóa
    const searchMatch = searchTerm === "" || 
      member.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.fullName && member.fullName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return statusMatch && searchMatch;
  });

  // Mô phỏng dữ liệu VIP key của thành viên đã chọn
  const memberKeys = [
    { id: 101, key: "MY_TOOL_VIP_1M_ABC123", type: "TOOL_TERMUX_1M", createdAt: "2023-06-01", expiresAt: "2023-07-01", status: "active" },
    { id: 102, key: "MY_TOOL_VIP_3M_DEF456", type: "TOOL_PC_3M", createdAt: "2023-05-15", expiresAt: "2023-08-15", status: "expired" }
  ];

  return (
    <PageTransition>
      <motion.h1 
        className="page-title"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Quản lý thành viên
      </motion.h1>

      <motion.div 
        className="content-section"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.02 }}
      >
        <div className="section-header">
          <div className="section-title">
            <UserGroupIcon className="section-icon" />
            <h2>Danh sách thành viên</h2>
          </div>
        </div>

        <div className="filter-bar">
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-input-group">
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, email, username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="search-btn">
                <MagnifyingGlassIcon className="search-icon" />
              </button>
            </div>
          </form>
          
          <div className="filter-group">
            <label>Lọc theo trạng thái:</label>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value="active">Đang hoạt động</option>
              <option value="inactive">Bị vô hiệu hóa</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="loading-indicator">Đang tải dữ liệu...</div>
        ) : (
          <div className="members-table">
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Tên đầy đủ</th>
                  <th>Trạng thái</th>
                  <th>Ngày đăng ký</th>
                  <th>Keys VIP</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.length > 0 ? (
                  filteredMembers.map(member => (
                    <tr key={member.id}>
                      <td>{member.username}</td>
                      <td>{member.email}</td>
                      <td>{member.fullName || '--'}</td>
                      <td>
                        <span className={`status-badge ${member.isActive ? 'active' : 'inactive'}`}>
                          {member.isActive ? 'Hoạt động' : 'Vô hiệu hóa'}
                        </span>
                      </td>
                      <td>{member.createdAt}</td>
                      <td>{member.keysCount}</td>
                      <td>
                        <div className="table-actions">
                          <button 
                            className="action-btn view" 
                            onClick={() => handleViewDetail(member)}
                            title="Xem chi tiết"
                          >
                            <EyeIcon className="action-icon" />
                          </button>
                          <button 
                            className={`action-btn ${member.isActive ? 'deactivate' : 'activate'}`}
                            onClick={() => toggleStatus(member.id)}
                            title={member.isActive ? 'Vô hiệu hóa' : 'Kích hoạt'}
                          >
                            {member.isActive ? 
                              <XCircleIcon className="action-icon" /> :
                              <CheckBadgeIcon className="action-icon" />
                            }
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="no-data">Không tìm thấy thành viên nào</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Modal chi tiết thành viên */}
      {showMemberDetail && selectedMember && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Chi tiết thành viên</h2>
              <button className="modal-close" onClick={closeDetail}>×</button>
            </div>
            <div className="modal-body">
              <div className="member-profile">
                <div className="member-avatar">
                  <UserCircleIcon className="avatar-icon" />
                </div>
                <div className="member-details">
                  <h3>{selectedMember.username}</h3>
                  <div className="detail-row">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{selectedMember.email}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Tên đầy đủ:</span>
                    <span className="detail-value">{selectedMember.fullName || '--'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Ngày đăng ký:</span>
                    <span className="detail-value">{selectedMember.createdAt}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Đăng nhập gần đây:</span>
                    <span className="detail-value">{selectedMember.lastLogin || 'Chưa đăng nhập'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Trạng thái:</span>
                    <span className={`detail-value status ${selectedMember.isActive ? 'active' : 'inactive'}`}>
                      {selectedMember.isActive ? 'Hoạt động' : 'Vô hiệu hóa'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="member-keys">
                <h4>Key VIP ({memberKeys.length})</h4>
                {memberKeys.length > 0 ? (
                  <table className="key-table">
                    <thead>
                      <tr>
                        <th>Key</th>
                        <th>Loại</th>
                        <th>Ngày tạo</th>
                        <th>Hết hạn</th>
                        <th>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {memberKeys.map(key => (
                        <tr key={key.id}>
                          <td>{key.key}</td>
                          <td>{key.type}</td>
                          <td>{key.createdAt}</td>
                          <td>{key.expiresAt}</td>
                          <td>
                            <span className={`status-badge ${key.status}`}>
                              {key.status === 'active' ? 'Hoạt động' : 'Hết hạn'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="no-keys-message">Thành viên này chưa có key VIP nào</p>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeDetail}>Đóng</button>
              <button 
                className={`btn ${selectedMember.isActive ? 'btn-danger' : 'btn-success'}`}
                onClick={() => {
                  toggleStatus(selectedMember.id);
                  closeDetail();
                }}
              >
                {selectedMember.isActive ? 'Vô hiệu hóa tài khoản' : 'Kích hoạt tài khoản'}
              </button>
            </div>
          </div>
        </div>
      )}
    </PageTransition>
  );
};

export default ManageMembers;