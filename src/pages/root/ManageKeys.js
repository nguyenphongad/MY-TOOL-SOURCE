import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  KeyIcon, 
  PlusIcon,
  TrashIcon,
  PencilIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';
import { toast } from 'sonner';
import PageTransition from '../../components/PageTransition';
import { itemVariants } from '../../components/AnimationConfig';

// Dữ liệu mẫu - Trong thực tế, lấy từ API
const sampleKeys = [
  { id: 1, key: "MY_TOOL_VIP_1M_2023ABC123", type: "TOOL_TERMUX_1M", status: "active", createdAt: "2023-06-15", expiresAt: "2023-07-15", owner: "user123", device: "DEVICEID123" },
  { id: 2, key: "MY_TOOL_VIP_3M_2023DEF456", type: "TOOL_TERMUX_3M", status: "expired", createdAt: "2023-05-10", expiresAt: "2023-08-10", owner: "user456", device: "DEVICEID456" },
  { id: 3, key: "MY_TOOL_VIP_1M_2023GHI789", type: "TOOL_PC_1M", status: "active", createdAt: "2023-06-20", expiresAt: "2023-07-20", owner: "user789", device: "DEVICEID789" },
  { id: 4, key: "MY_TOOL_VIP_6M_2023JKL012", type: "TOOL_PC_6M", status: "pending", createdAt: "2023-06-25", expiresAt: "2024-01-25", owner: "user012", device: "" }
];

const ManageKeys = () => {
  const [keysData, setKeysData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedKey, setSelectedKey] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showKeys, setShowKeys] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    // Mô phỏng tải dữ liệu - trong thực tế, gọi API
    setTimeout(() => {
      setKeysData(sampleKeys);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleEdit = (key) => {
    setSelectedKey(key);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa key này?')) {
      // Mô phỏng xóa - trong thực tế, gọi API
      setKeysData(prev => prev.filter(item => item.id !== id));
      toast.success('Đã xóa key thành công!');
    }
  };

  const handleAdd = () => {
    setSelectedKey({
      id: null,
      key: generateRandomKey(),
      type: "TOOL_TERMUX_1M",
      status: "pending",
      createdAt: new Date().toISOString().split('T')[0],
      expiresAt: "", // To be calculated based on type
      owner: "",
      device: ""
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (selectedKey.id) {
      // Cập nhật
      setKeysData(prev => prev.map(item => 
        item.id === selectedKey.id ? selectedKey : item
      ));
      toast.success('Cập nhật key thành công!');
    } else {
      // Thêm mới
      const newId = Math.max(...keysData.map(item => item.id)) + 1;
      setKeysData(prev => [...prev, { ...selectedKey, id: newId }]);
      toast.success('Thêm key mới thành công!');
    }
    setIsEditing(false);
    setSelectedKey(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedKey(prev => ({
      ...prev,
      [name]: value
    }));

    // Tính toán ngày hết hạn dựa trên loại key nếu cần
    if (name === 'type' && !selectedKey.id) {
      const today = new Date();
      let expiresAt = new Date(today);
      
      if (value.includes('1M')) {
        expiresAt.setMonth(today.getMonth() + 1);
      } else if (value.includes('3M')) {
        expiresAt.setMonth(today.getMonth() + 3);
      } else if (value.includes('6M')) {
        expiresAt.setMonth(today.getMonth() + 6);
      } else if (value.includes('1Y')) {
        expiresAt.setFullYear(today.getFullYear() + 1);
      }
      
      setSelectedKey(prev => ({
        ...prev,
        expiresAt: expiresAt.toISOString().split('T')[0]
      }));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedKey(null);
  };

  const generateRandomKey = () => {
    const prefix = "MY_TOOL_VIP_";
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}${timestamp}_${random}`;
  };

  const toggleShowKeys = () => {
    setShowKeys(!showKeys);
  };

  const filteredKeys = keysData.filter(key => {
    if (filterStatus === "all") return true;
    return key.status === filterStatus;
  });

  return (
    <PageTransition>
      <motion.h1 
        className="page-title"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Quản lý KEY VIP
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
            <KeyIcon className="section-icon" />
            <h2>Danh sách KEY VIP</h2>
          </div>
          <div className="header-actions">
            <button className="btn btn-icon" onClick={toggleShowKeys}>
              {showKeys ? <EyeSlashIcon className="btn-icon-sm" /> : <EyeIcon className="btn-icon-sm" />}
              {showKeys ? 'Ẩn keys' : 'Hiện keys'}
            </button>
            <button className="btn btn-sm" onClick={handleAdd}>
              <PlusIcon className="btn-icon-sm" />
              Thêm key mới
            </button>
          </div>
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
              <option value="expired">Đã hết hạn</option>
              <option value="pending">Chờ kích hoạt</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="loading-indicator">Đang tải dữ liệu...</div>
        ) : (
          <>
            {isEditing ? (
              <div className="key-edit-form">
                <h3>{selectedKey.id ? 'Chỉnh sửa KEY' : 'Thêm KEY mới'}</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="key">Mã KEY</label>
                    <input
                      type="text"
                      id="key"
                      name="key"
                      value={selectedKey.key}
                      onChange={handleChange}
                      required
                      readOnly={selectedKey.id !== null} // Chỉ cho phép sửa khi thêm mới
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="type">Loại KEY</label>
                    <select
                      id="type"
                      name="type"
                      value={selectedKey.type}
                      onChange={handleChange}
                      required
                    >
                      <option value="TOOL_TERMUX_1M">TOOL TERMUX - 1 tháng</option>
                      <option value="TOOL_TERMUX_3M">TOOL TERMUX - 3 tháng</option>
                      <option value="TOOL_TERMUX_6M">TOOL TERMUX - 6 tháng</option>
                      <option value="TOOL_TERMUX_1Y">TOOL TERMUX - 1 năm</option>
                      <option value="TOOL_PC_1M">TOOL PC - 1 tháng</option>
                      <option value="TOOL_PC_3M">TOOL PC - 3 tháng</option>
                      <option value="TOOL_PC_6M">TOOL PC - 6 tháng</option>
                      <option value="TOOL_PC_1Y">TOOL PC - 1 năm</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="owner">Chủ sở hữu</label>
                    <input
                      type="text"
                      id="owner"
                      name="owner"
                      value={selectedKey.owner}
                      onChange={handleChange}
                      placeholder="Tên người dùng/ID"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="device">Device ID</label>
                    <input
                      type="text"
                      id="device"
                      name="device"
                      value={selectedKey.device}
                      onChange={handleChange}
                      placeholder="Device ID (nếu có)"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="status">Trạng thái</label>
                    <select
                      id="status"
                      name="status"
                      value={selectedKey.status}
                      onChange={handleChange}
                      required
                    >
                      <option value="active">Đang hoạt động</option>
                      <option value="expired">Đã hết hạn</option>
                      <option value="pending">Chờ kích hoạt</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="expiresAt">Ngày hết hạn</label>
                    <input
                      type="date"
                      id="expiresAt"
                      name="expiresAt"
                      value={selectedKey.expiresAt}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                    Hủy
                  </button>
                  <button type="button" className="btn" onClick={handleSave}>
                    {selectedKey.id ? 'Cập nhật' : 'Thêm mới'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="keys-table">
                <table>
                  <thead>
                    <tr>
                      <th>KEY</th>
                      <th>Loại</th>
                      <th>Trạng thái</th>
                      <th>Ngày tạo</th>
                      <th>Hết hạn</th>
                      <th>Chủ sở hữu</th>
                      <th>Device</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredKeys.length > 0 ? (
                      filteredKeys.map(key => (
                        <tr key={key.id}>
                          <td className="key-cell">
                            {showKeys ? key.key : '••••••••••••••••'}
                          </td>
                          <td>{key.type}</td>
                          <td>
                            <span className={`status-badge ${key.status}`}>
                              {key.status === 'active' ? 'Hoạt động' : 
                               key.status === 'expired' ? 'Hết hạn' : 'Chờ kích hoạt'}
                            </span>
                          </td>
                          <td>{key.createdAt}</td>
                          <td>{key.expiresAt}</td>
                          <td>{key.owner || '--'}</td>
                          <td>{key.device || '--'}</td>
                          <td>
                            <div className="table-actions">
                              <button className="action-btn edit" onClick={() => handleEdit(key)}>
                                <PencilIcon className="action-icon" />
                              </button>
                              <button className="action-btn delete" onClick={() => handleDelete(key.id)}>
                                <TrashIcon className="action-icon" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="no-data">Không tìm thấy key nào</td>
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

export default ManageKeys;
