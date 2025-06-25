import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useSearchParams } from 'react-router-dom';
import { 
  PencilIcon, 
  TrashIcon,
  MagnifyingGlassIcon,
  CheckIcon,
  XMarkIcon,
  ClockIcon,
  ClipboardIcon
} from '@heroicons/react/24/outline';
import * as AlertDialog from '@radix-ui/react-alert-dialog'; // Sửa lại import AlertDialog
import { toast } from 'sonner';
import PageTransition from '../../components/PageTransition';
import { itemVariants } from '../../components/AnimationConfig';

// Hàm tạo deviceId ngẫu nhiên
const generateRandomDeviceId = () => {
  const uuid = 'MYTOOL' + Math.random().toString(36).substring(2, 8).toUpperCase() + 
    '-' + Math.random().toString(36).substring(2, 6).toUpperCase() +
    '-' + Math.random().toString(36).substring(2, 6).toUpperCase() +
    '-' + Math.random().toString(36).substring(2, 6).toUpperCase() +
    '-' + Math.random().toString(36).substring(2, 10).toUpperCase();
  return uuid;
};

// Hàm tạo key ngẫu nhiên
const generateRandomKey = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase() + 
    Math.random().toString(36).substring(2, 8).toUpperCase();
};

// Hàm rút gọn hiển thị DeviceID
const truncateDeviceId = (deviceId) => {
  if (deviceId.length <= 10) return deviceId;
  
  const prefix = deviceId.substring(0, 8); // Lấy 8 ký tự đầu
  const suffix = deviceId.substring(deviceId.length - 5); // Lấy 5 ký tự cuối
  
  return `${prefix}...${suffix}`;
};

// Hàm rút gọn hiển thị Key
const truncateKey = (key) => {
  if (key.length <= 8) return key;
  
  const prefix = key.substring(0, 6); // Lấy 6 ký tự đầu
  const suffix = key.substring(key.length - 1); // Lấy 1 ký tự cuối
  
  return `${prefix}...${suffix}`;
};

// Hàm kiểm tra trạng thái hết hạn và tính số ngày còn lại
const checkExpiryStatus = (expiryDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return {
    isExpired: diffDays < 0,
    daysRemaining: diffDays
  };
};

// Dữ liệu mẫu
const DEMO_TRANSACTIONS = [
  { 
    transactionId: 100001, // Thay đổi từ id thành transactionId
    deviceId: generateRandomDeviceId(), 
    key: generateRandomKey(), 
    keyType: "termux", 
    expiryDate: "2023-12-30", // Đã hết hạn
    note: "Khách hàng Zalo: Nguyễn Văn A - 0987654321" 
  },
  { 
    transactionId: 100002, // Thay đổi từ id thành transactionId
    deviceId: generateRandomDeviceId(), 
    key: generateRandomKey(), 
    keyType: "termux", 
    expiryDate: "2023-11-15", // Đã hết hạn
    note: "Khách mua qua Facebook" 
  },
  { 
    transactionId: 100003, // Thay đổi từ id thành transactionId
    deviceId: generateRandomDeviceId(), 
    key: generateRandomKey(), 
    keyType: "pc", 
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().split('T')[0], // Còn 15 ngày
    note: "Khách VIP, đã mua nhiều lần" 
  },
  { 
    transactionId: 100004, // Thay đổi từ id thành transactionId
    deviceId: generateRandomDeviceId(), 
    key: generateRandomKey(), 
    keyType: "pc", 
    expiryDate: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString().split('T')[0], // Đã hết hạn 10 ngày
    note: "" 
  },
  { 
    transactionId: 100005, // Thay đổi từ id thành transactionId
    deviceId: generateRandomDeviceId(), 
    key: generateRandomKey(), 
    keyType: "termux", 
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0], // Còn 5 ngày
    note: "Khách quen, SĐT: 0912345678" 
  },
];

// Khởi tạo dữ liệu demo trong localStorage nếu chưa có dữ liệu
const initializeDemoData = () => {
  const existingData = localStorage.getItem('recentTransactions');
  if (!existingData || JSON.parse(existingData).length === 0) {
    localStorage.setItem('recentTransactions', JSON.stringify(DEMO_TRANSACTIONS));
  }
};

// Gọi hàm khởi tạo dữ liệu
initializeDemoData();

const TransactionHistory = () => {
  // Lấy transactionId từ URL query params
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get('transactionId') ? 
    parseInt(searchParams.get('transactionId')) : null;

  // Refs để lưu trữ phần tử giao dịch tìm thấy
  const highlightedRowRef = useRef(null);

  // State cho dữ liệu và loading
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [highlightedTransaction, setHighlightedTransaction] = useState(null);
  
  // State cho chỉnh sửa
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    deviceId: '',
    expiryDate: '',
    note: ''
  });

  // State cho bộ lọc
  const [filters, setFilters] = useState({
    keyType: 'all',
    status: 'all',
    searchTerm: ''
  });

  useEffect(() => {
    // Giả lập tải dữ liệu - trong thực tế, gọi API
    setTimeout(() => {
      // Lấy dữ liệu từ localStorage
      const savedTransactions = JSON.parse(localStorage.getItem('recentTransactions') || '[]');
      setTransactions(savedTransactions);
      setIsLoading(false);

      // Nếu có transactionId, tìm giao dịch tương ứng để highlight
      if (transactionId) {
        const transaction = savedTransactions.find(t => t.transactionId === transactionId); // Thay đổi từ id thành transactionId
        if (transaction) {
          setHighlightedTransaction(transaction.transactionId); // Thay đổi từ id thành transactionId
          
          // Cuộn đến giao dịch được highlight
          setTimeout(() => {
            if (highlightedRowRef.current) {
              highlightedRowRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
              });
            }
          }, 300);
        }
      }
    }, 700);
  }, [transactionId]);

  // Xử lý thay đổi bộ lọc
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault();
    // Trong thực tế, có thể gửi yêu cầu API tìm kiếm ở đây
    toast.info(`Đang tìm kiếm: ${filters.searchTerm}`);
  };

  // Xử lý bắt đầu chỉnh sửa
  const handleStartEdit = (transaction) => {
    setEditingId(transaction.transactionId);
    setEditData({
      deviceId: transaction.deviceId,
      expiryDate: transaction.expiryDate,
      note: transaction.note
    });
  };

  // Xử lý hủy chỉnh sửa
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({
      deviceId: '',
      expiryDate: '',
      note: ''
    });
  };

  // Xử lý lưu thay đổi
  const handleSaveEdit = (transactionId) => { // Thay đổi từ id thành transactionId
    // Cập nhật dữ liệu giao dịch
    const updatedTransactions = transactions.map(item => {
      if (item.transactionId === transactionId) { // Thay đổi từ id thành transactionId
        return {
          ...item,
          deviceId: editData.deviceId,
          expiryDate: editData.expiryDate,
          note: editData.note
        };
      }
      return item;
    });
    
    setTransactions(updatedTransactions);
    
    // Cập nhật localStorage
    localStorage.setItem('recentTransactions', JSON.stringify(updatedTransactions));
    
    toast.success('Cập nhật thông tin giao dịch thành công!');
    setEditingId(null);
  };

  // Xử lý xóa giao dịch
  const handleDelete = (transactionId) => { // Thay đổi từ id thành transactionId
    setTransactions(prev => prev.filter(item => item.transactionId !== transactionId)); // Thay đổi từ id thành transactionId
    
    // Cập nhật localStorage sau khi xóa
    const updatedTransactions = transactions.filter(item => item.transactionId !== transactionId);
    localStorage.setItem('recentTransactions', JSON.stringify(updatedTransactions));
    
    toast.success('Xóa giao dịch thành công!');
  };

  // Xử lý thay đổi dữ liệu chỉnh sửa
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Xử lý copy Key
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success('Đã sao chép Key vào clipboard!'))
      .catch(() => toast.error('Không thể sao chép Key!'));
  };

  // Lọc dữ liệu theo bộ lọc hiện tại
  const filteredTransactions = transactions.filter(transaction => {
    // Lọc theo loại key
    const keyTypeMatch = filters.keyType === 'all' || transaction.keyType === filters.keyType;
    
    // Lọc theo trạng thái (dựa trên ngày hết hạn so với ngày hiện tại)
    const { isExpired } = checkExpiryStatus(transaction.expiryDate);
    const statusMatch = filters.status === 'all' || 
      (filters.status === 'valid' && !isExpired) || 
      (filters.status === 'expired' && isExpired);
    
    // Lọc theo từ khóa tìm kiếm
    const searchMatch = filters.searchTerm === '' || 
      transaction.key.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      transaction.note.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    return keyTypeMatch && statusMatch && searchMatch;
  });

  return (
    <PageTransition>
      <motion.h1 
        className="page-title"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Lịch sử giao dịch
      </motion.h1>

      <motion.div 
        className="content-section"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.02 }}
      >
        <div className="transaction-filters">
          <div className="filter-options">
            <div className="filter-group">
              <label htmlFor="keyType">Loại KEY:</label>
              <select 
                id="keyType"
                name="keyType"
                value={filters.keyType}
                onChange={handleFilterChange}
              >
                <option value="all">Tất cả</option>
                <option value="termux">KEY VIP TERMUX</option>
                <option value="pc">KEY VIP PC</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="status">Trạng thái:</label>
              <select 
                id="status"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="all">Tất cả</option>
                <option value="valid">Còn hạn</option>
                <option value="expired">Hết hạn</option>
              </select>
            </div>
          </div>

          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-input-group">
              <input
                type="text"
                placeholder="Tìm kiếm theo KEY hoặc ghi chú..."
                name="searchTerm"
                value={filters.searchTerm}
                onChange={handleFilterChange}
              />
              <button type="submit" className="search-btn">
                <MagnifyingGlassIcon className="search-icon" />
              </button>
            </div>
          </form>
        </div>

        {isLoading ? (
          <div className="loading-indicator">Đang tải dữ liệu...</div>
        ) : (
          <div className="transactions-table-container">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Device ID</th>
                  <th>Key</th>
                  <th>Thời hạn</th>
                  <th>Ghi chú</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction, index) => {
                    // Tính trạng thái hết hạn và số ngày còn lại
                    const { isExpired, daysRemaining } = checkExpiryStatus(transaction.expiryDate);
                    const isHighlighted = transaction.transactionId === highlightedTransaction; // Thay đổi từ id thành transactionId
                    
                    return (
                      <tr 
                        key={transaction.transactionId} // Thay đổi từ id thành transactionId
                        ref={isHighlighted ? highlightedRowRef : null}
                        className={isHighlighted ? 'highlighted-transaction' : ''}
                      >
                        <td>{index + 1}</td>
                        <td>
                          {editingId === transaction.transactionId ? ( // Thay đổi từ id thành transactionId
                            <input
                              type="text"
                              name="deviceId"
                              value={editData.deviceId}
                              onChange={handleEditChange}
                              className="edit-input"
                            />
                          ) : (
                            <div className="id-cell">
                              <span className="device-id-text">
                                <strong>{truncateDeviceId(transaction.deviceId)}</strong>
                              </span>
                            </div>
                          )}
                        </td>
                        <td>
                          <div className="key-cell">
                            <span 
                              className="key-text copyable"
                              onClick={() => handleCopy(transaction.key)}
                              title="Nhấp để sao chép"
                            >
                              <strong>{truncateKey(transaction.key)}</strong>
                              <ClipboardIcon className="copy-icon" />
                            </span>
                            <span className={`key-badge ${transaction.keyType}`}>
                              {transaction.keyType === 'termux' ? 'TERMUX' : 'PC'}
                            </span>
                          </div>
                        </td>
                        <td>
                          {editingId === transaction.transactionId ? (
                            <input
                              type="date"
                              name="expiryDate"
                              value={editData.expiryDate}
                              onChange={handleEditChange}
                              className="edit-input date-input"
                            />
                          ) : (
                            <div className="expiry-date">
                              <span className="date-text">{new Date(transaction.expiryDate).toLocaleDateString('vi-VN')}</span>
                              <span className={`status-badge ${isExpired ? 'expired' : 'valid'}`}>
                                {isExpired 
                                  ? 'Hết hạn' 
                                  : (
                                    <span>
                                      Còn hạn
                                      {daysRemaining > 0 && (
                                        <span className="days-remaining"> (còn {daysRemaining} ngày)</span>
                                      )}
                                    </span>
                                  )
                                }
                              </span>
                            </div>
                          )}
                        </td>
                        <td>
                          {editingId === transaction.transactionId ? (
                            <textarea
                              name="note"
                              value={editData.note}
                              onChange={handleEditChange}
                              className="edit-input note-input"
                              rows="2"
                            />
                          ) : (
                            transaction.note || '--'
                          )}
                        </td>
                        <td>
                          <div className="table-actions">
                            {editingId === transaction.transactionId ? ( // Thay đổi từ id thành transactionId
                              <>
                                <button 
                                  className="action-btn save" 
                                  title="Lưu thay đổi" 
                                  onClick={() => handleSaveEdit(transaction.transactionId)} // Thay đổi từ id thành transactionId
                                >
                                  <CheckIcon className="action-icon" />
                                </button>
                                <button 
                                  className="action-btn cancel" 
                                  title="Hủy bỏ" 
                                  onClick={handleCancelEdit}
                                >
                                  <XMarkIcon className="action-icon" />
                                </button>
                              </>
                            ) : (
                              <>
                                <button 
                                  className="action-btn edit" 
                                  title="Chỉnh sửa" 
                                  onClick={() => handleStartEdit(transaction)}
                                >
                                  <PencilIcon className="action-icon" />
                                </button>
                                <AlertDialog.Root>
                                  <AlertDialog.Trigger asChild>
                                    <button className="action-btn delete" title="Xóa">
                                      <TrashIcon className="action-icon" />
                                    </button>
                                  </AlertDialog.Trigger>
                                  <AlertDialog.Portal>
                                    <AlertDialog.Overlay className="alert-dialog-overlay" />
                                    <AlertDialog.Content className="alert-dialog">
                                      <AlertDialog.Title className="alert-title">
                                        Xác nhận xóa
                                      </AlertDialog.Title>
                                      <AlertDialog.Description className="alert-description">
                                        Bạn có chắc chắn muốn xóa giao dịch này? Hành động này không thể hoàn tác.
                                      </AlertDialog.Description>
                                      <div className="alert-buttons">
                                        <AlertDialog.Cancel className="btn btn-secondary">
                                          Không
                                        </AlertDialog.Cancel>
                                        <AlertDialog.Action 
                                          className="btn btn-danger"
                                          onClick={() => handleDelete(transaction.transactionId)} // Thay đổi từ id thành transactionId
                                        >
                                          Có, xóa
                                        </AlertDialog.Action>
                                      </div>
                                    </AlertDialog.Content>
                                  </AlertDialog.Portal>
                                </AlertDialog.Root>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="no-data">
                      Không tìm thấy giao dịch nào phù hợp
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </PageTransition>
  );
};


export default TransactionHistory;
