import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
  CheckBadgeIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { toast } from 'sonner';
import PageTransition from '../../components/PageTransition';
import { itemVariants } from '../../components/AnimationConfig';

// Dữ liệu mẫu - Trong thực tế, lấy từ API
const sampleAdmins = [
  { id: 1, username: 'admin1', fullName: 'Nguyễn Văn A', email: 'admin1@example.com', role: 'admin', isActive: true, createdAt: '2023-01-15' },
  { id: 2, username: 'admin2', fullName: 'Trần Thị B', email: 'admin2@example.com', role: 'admin', isActive: true, createdAt: '2023-02-20' },
  { id: 3, username: 'admin3', fullName: 'Lê Văn C', email: 'admin3@example.com', role: 'admin', isActive: false, createdAt: '2023-03-10' },
  { id: 4, username: 'root_admin', fullName: 'Root Administrator', email: 'root@example.com', role: 'root', isActive: true, createdAt: '2023-01-01' }
];

const ManageAdmins = () => {
  const [adminsData, setAdminsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    // Mô phỏng tải dữ liệu - trong thực tế, gọi API
    setTimeout(() => {
      setAdminsData(sampleAdmins);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    const adminToDelete = adminsData.find(admin => admin.id === id);
    
    if (adminToDelete.role === 'root') {
      toast.error('Không thể xóa tài khoản Root Admin!');
      return;
    }
    
    if (window.confirm('Bạn có chắc chắn muốn xóa admin này?')) {
      // Mô phỏng xóa - trong thực tế, gọi API
      setAdminsData(prev => prev.filter(item => item.id !== id));
      toast.success('Đã xóa admin thành công!');
    }
  };

  const handleAdd = () => {
    setSelectedAdmin({
      id: null,
      username: '',
      fullName: '',
      email: '',
      role: 'admin', // Mặc định là admin
      isActive: true,
      password: '', // Chỉ khi thêm mới
      createdAt: new Date().toISOString().split('T')[0]
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (selectedAdmin.id) {
      // Cập nhật
      setAdminsData(prev => prev.map(item => 
        item.id === selectedAdmin.id ? selectedAdmin : item
      ));
      toast.success('Cập nhật admin thành công!');
    } else {
      // Thêm mới
      const newId = Math.max(...adminsData.map(item => item.id)) + 1;
      setAdminsData(prev => [...prev, { ...selectedAdmin, id: newId }]);
      toast.success('Thêm admin mới thành công!');
    }
    setIsEditing(false);
    setSelectedAdmin(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSelectedAdmin(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedAdmin(null);
  };

  const toggleStatus = (id) => {
    const adminToToggle = adminsData.find(admin => admin.id === id);
    
    if (adminToToggle.role === 'root') {
      toast.error('Không thể vô hiệu hóa tài khoản Root Admin!');
      return;
    }
    
    setAdminsData(prev => prev.map(admin => 
      admin.id === id ? { ...admin, isActive: !admin.isActive } : admin
    ));
    
    toast.success(`Đã ${adminToToggle.isActive ? 'vô hiệu hóa' : 'kích hoạt'} tài khoản admin!`);
  };

  const filteredAdmins = adminsData.filter(admin => {
    if (filterStatus === "all") return true;
    return filterStatus === "active" ? admin.isActive : !admin.isActive;
  });

  return (
    <PageTransition>
      <motion.h1 
        className="page-title"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Quản lý Admin
      </motion.h1>

      <motion.div 
        className="content-section"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.02 }}
      >
        <div className="section-header with-actions">
          <div className="section-title">
            <ShieldCheckIcon className="section-icon" />
            <h2>Danh sách Admin</h2>
          </div>
          <button className="btn btn-sm" onClick={handleAdd}>
            <PlusIcon className="btn-icon-sm" />
            Thêm Admin mới
          </button>
        </div>

        <div className="filter-bar">
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
          <>
            {isEditing ? (
              <div className="admin-edit-form">
                <h3>{selectedAdmin.id ? 'Chỉnh sửa Admin' : 'Thêm Admin mới'}</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="username">Tên đăng nhập</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={selectedAdmin.username}
                      onChange={handleChange}
                      required
                      readOnly={selectedAdmin.id !== null} // Không cho sửa username đã tồn tại
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="fullName">Tên đầy đủ</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={selectedAdmin.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={selectedAdmin.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="role">Vai trò</label>
                    <select
                      id="role"
                      name="role"
                      value={selectedAdmin.role}
                      onChange={handleChange}
                      required
                      disabled={selectedAdmin.id !== null} // Chỉ cho phép đặt vai trò khi thêm mới
                    >
                      <option value="admin">Admin</option>
                      <option value="root">Root Admin</option>
                    </select>
                  </div>
                </div>

                {!selectedAdmin.id && (
                  <div className="form-group">
                    <label htmlFor="password">Mật khẩu</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={selectedAdmin.password}
                      onChange={handleChange}
                      required={!selectedAdmin.id} // Bắt buộc khi thêm mới
                    />
                  </div>
                )}

                {selectedAdmin.id && (
                  <div className="form-group checkbox-group">
                    <input
                      type="checkbox"
                      id="isActive"
                      name="isActive"
                      checked={selectedAdmin.isActive}
                      onChange={handleChange}
                      disabled={selectedAdmin.role === 'root'} // Không cho phép vô hiệu hóa root
                    />
                    <label htmlFor="isActive">Kích hoạt tài khoản</label>
                  </div>
                )}

                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                    Hủy
                  </button>
                  <button type="button" className="btn" onClick={handleSave}>
                    {selectedAdmin.id ? 'Cập nhật' : 'Thêm mới'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="admins-table">
                <table>
                  <thead>
                    <tr>
                      <th>Tên đăng nhập</th>
                      <th>Tên đầy đủ</th>
                      <th>Email</th>
                      <th>Vai trò</th>
                      <th>Trạng thái</th>
                      <th>Ngày tạo</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAdmins.length > 0 ? (
                      filteredAdmins.map(admin => (
                        <tr key={admin.id}>
                          <td>{admin.username}</td>
                          <td>{admin.fullName}</td>
                          <td>{admin.email}</td>
                          <td>
                            <span className={`role-badge ${admin.role}`}>
                              {admin.role === 'root' ? 'Root Admin' : 'Admin'}
                            </span>
                          </td>
                          <td>
                            <span className={`status-badge ${admin.isActive ? 'active' : 'inactive'}`}>
                              {admin.isActive ? 'Hoạt động' : 'Vô hiệu hóa'}
                            </span>
                          </td>
                          <td>{admin.createdAt}</td>
                          <td>
                            <div className="table-actions">
                              <button 
                                className={`action-btn ${admin.isActive ? 'deactivate' : 'activate'}`}
                                onClick={() => toggleStatus(admin.id)}
                                disabled={admin.role === 'root'}
                                title={admin.isActive ? 'Vô hiệu hóa' : 'Kích hoạt'}
                              >
                                {admin.isActive ? 
                                  <XCircleIcon className="action-icon" /> :
                                  <CheckBadgeIcon className="action-icon" />
                                }
                              </button>
                              <button className="action-btn edit" onClick={() => handleEdit(admin)}>
                                <PencilIcon className="action-icon" />
                              </button>
                              <button 
                                className="action-btn delete" 
                                onClick={() => handleDelete(admin.id)}
                                disabled={admin.role === 'root'}
                              >
                                <TrashIcon className="action-icon" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="no-data">Không tìm thấy admin nào</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </motion.div>
    </PageTransition>
  );
};

export default ManageAdmins;
