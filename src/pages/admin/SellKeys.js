import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  KeyIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';
import { toast } from 'sonner';
import PageTransition from '../../components/PageTransition';
import { itemVariants } from '../../components/AnimationConfig';
import DatePicker from 'react-datepicker'; 
import "react-datepicker/dist/react-datepicker.css";

// Hàm tạo transactionID ngẫu nhiên 6 chữ số bắt đầu từ 100000
const generateTransactionId = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const SellKeys = () => {
  // Tab state
  const [activeTab, setActiveTab] = useState('termux');
  const navigate = useNavigate();
  
  // Form states
  const [keyInfo, setKeyInfo] = useState({
    keyType: 'TOOL_TERMUX_1M',
    device: '',
    note: '',
    dateOption: 'preset',
    customDate: new Date(new Date().setMonth(new Date().getMonth() + 1)), // Default 1 month ahead
  });
  
  // Tab changing handler
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Calculate days remaining from today to selected date
  const calculateDays = (targetDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time part for accurate day calculation
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Form field change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setKeyInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Date picker change handler
  const handleDateChange = (date) => {
    setKeyInfo(prev => ({
      ...prev,
      customDate: date
    }));
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate DeviceID - required field
    if (!keyInfo.device.trim()) {
      toast.error('Device ID là trường bắt buộc!');
      return;
    }
    
    // Generate key name based on selection
    let keyTypeForGeneration = keyInfo.keyType;
    
    // If custom date option is selected
    if (keyInfo.dateOption === 'custom') {
      const days = calculateDays(keyInfo.customDate);
      keyTypeForGeneration = `TOOL_TERMUX_CUSTOM_${days}D`;
    }
    
    // Tạo transaction ID ngẫu nhiên
    const transactionId = generateTransactionId();
    
    // Generate mock key - in reality, this would call an API
    const generatedKey = Math.random().toString(36).substring(2, 8).toUpperCase() + 
      Math.random().toString(36).substring(2, 8).toUpperCase();
    
    // Tạo dữ liệu ngày hết hạn dựa trên loại key hoặc ngày tùy chỉnh
    let expiryDate;
    if (keyInfo.dateOption === 'custom') {
      expiryDate = keyInfo.customDate.toISOString().split('T')[0];
    } else {
      // Tính toán ngày hết hạn dựa trên loại key
      const today = new Date();
      switch(keyInfo.keyType) {
        case 'TOOL_TERMUX_1M':
          expiryDate = new Date(today.setMonth(today.getMonth() + 1)).toISOString().split('T')[0];
          break;
        case 'TOOL_TERMUX_3M':
          expiryDate = new Date(today.setMonth(today.getMonth() + 3)).toISOString().split('T')[0];
          break;
        case 'TOOL_TERMUX_6M':
          expiryDate = new Date(today.setMonth(today.getMonth() + 6)).toISOString().split('T')[0];
          break;
        case 'TOOL_TERMUX_1Y':
          expiryDate = new Date(today.setFullYear(today.getFullYear() + 1)).toISOString().split('T')[0];
          break;
        default:
          expiryDate = new Date(today.setMonth(today.getMonth() + 1)).toISOString().split('T')[0];
      }
    }
    
    toast.success('Đã tạo key VIP thành công!');
    
    // Lưu key vừa tạo vào localStorage để nhớ tạm thời
    const newTransaction = {
      transactionId: transactionId, // Thay đổi từ id thành transactionId
      key: generatedKey,
      keyType: activeTab, // 'termux' hoặc 'pc'
      deviceId: keyInfo.device,
      expiryDate: expiryDate,
      note: keyInfo.note || '',
    };
    
    // Lưu transaction mới vào localStorage
    const existingTransactions = JSON.parse(localStorage.getItem('recentTransactions') || '[]');
    existingTransactions.unshift(newTransaction); // Thêm vào đầu danh sách
    localStorage.setItem('recentTransactions', JSON.stringify(existingTransactions));
    
    // Chuyển đến trang transactions với transactionId trong query params
    navigate(`/manage/transactions?transactionId=${transactionId}`);
  };

  return (
    <PageTransition>
      <motion.h1 
        className="page-title"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Bán KEY VIP Thủ công
      </motion.h1>

      <motion.div 
        className="content-section"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.02 }}
      >
        {/* Tabs navigation */}
        <div className="tabs-navigation">
          <button 
            className={`tab-button ${activeTab === 'termux' ? 'active' : ''}`}
            onClick={() => handleTabChange('termux')}
          >
            <DevicePhoneMobileIcon className="tab-icon" />
            KEY VIP TERMUX
          </button>
          <button 
            className={`tab-button ${activeTab === 'pc' ? 'active' : ''}`}
            onClick={() => handleTabChange('pc')}
          >
            <ComputerDesktopIcon className="tab-icon" />
            KEY VIP PC
          </button>
        </div>

        {/* Tab content */}
        <div className="tab-content">
          {/* TERMUX Tab Content */}
          {activeTab === 'termux' && (
            <form className="key-generation-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="device">Device ID <span className="required">*</span></label>
                <input
                  type="text"
                  id="device"
                  name="device"
                  value={keyInfo.device}
                  onChange={handleChange}
                  placeholder="Nhập Device ID"
                  required
                  className={!keyInfo.device ? "highlight-required" : ""}
                />
                <small className="field-hint">DeviceID là bắt buộc để tạo key</small>
              </div>

              <div className="form-group">
                <label>Loại key</label>
                <div className="radio-options">
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="dateOptionPreset"
                      name="dateOption"
                      value="preset"
                      checked={keyInfo.dateOption === 'preset'}
                      onChange={handleChange}
                    />
                    <label htmlFor="dateOptionPreset">Chọn loại mặc định</label>
                  </div>
                  
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="dateOptionCustom"
                      name="dateOption"
                      value="custom"
                      checked={keyInfo.dateOption === 'custom'}
                      onChange={handleChange}
                    />
                    <label htmlFor="dateOptionCustom">Chọn ngày</label>
                  </div>
                </div>
                
                {keyInfo.dateOption === 'preset' ? (
                  <div className="preset-options">
                    <select
                      id="keyType"
                      name="keyType"
                      value={keyInfo.keyType}
                      onChange={handleChange}
                      required
                    >
                      <option value="TOOL_TERMUX_1M">TERMUX - 1 tháng</option>
                      <option value="TOOL_TERMUX_3M">TERMUX - 3 tháng</option>
                      <option value="TOOL_TERMUX_6M">TERMUX - 6 tháng</option>
                      <option value="TOOL_TERMUX_1Y">TERMUX - 1 năm</option>
                    </select>
                  </div>
                ) : (
                  <div className="custom-date-picker">
                    <div className="date-picker-container">
                      <CalendarDaysIcon className="calendar-icon" />
                      <DatePicker
                        selected={keyInfo.customDate}
                        onChange={handleDateChange}
                        minDate={new Date()}
                        dateFormat="dd/MM/yyyy"
                        className="date-input"
                      />
                    </div>
                    <div className="days-remaining">
                      <span className="days-count">{calculateDays(keyInfo.customDate)}</span> ngày kể từ hôm nay
                    </div>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="note">Ghi chú</label>
                <textarea
                  id="note"
                  name="note"
                  value={keyInfo.note}
                  onChange={handleChange}
                  placeholder="*Tên Zalo người mua, cần SĐT thì nếu có"
                  rows="2"
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-root">
                  <KeyIcon className="btn-icon" />
                  Tạo key VIP
                </button>
              </div>
            </form>
          )}

          {/* PC Tab Content - Empty for now */}
          {activeTab === 'pc' && (
            <div className="empty-tab-content">
              <ComputerDesktopIcon className="empty-tab-icon" />
              <h3>Tính năng KEY VIP PC đang được phát triển</h3>
              <p>Chức năng này sẽ sớm được cập nhật trong thời gian tới.</p>
            </div>
          )}
        </div>
      </motion.div>
    </PageTransition>
  );
};

export default SellKeys;
