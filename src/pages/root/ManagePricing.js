import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  PencilIcon, 
  PlusIcon, 
  TrashIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import { toast } from 'sonner';
import PageTransition from '../../components/PageTransition';
import { itemVariants } from '../../components/AnimationConfig';

// Dữ liệu mẫu - Trong thực tế, lấy từ API
const samplePricing = [
  { id: 1, type: "TOOL_TERMUX_1M", name: "TOOL TERMUX - 1 tháng", price: 100000, stock: 10, isOnSale: false, originalPrice: null },
  { id: 2, type: "TOOL_TERMUX_3M", name: "TOOL TERMUX - 3 tháng", price: 250000, stock: 5, isOnSale: true, originalPrice: 300000 },
  { id: 3, type: "TOOL_PC_1M", name: "TOOL PC - 1 tháng", price: 150000, stock: 8, isOnSale: false, originalPrice: null },
  { id: 4, type: "TOOL_PC_3M", name: "TOOL PC - 3 tháng", price: 400000, stock: 3, isOnSale: true, originalPrice: 450000 }
];

const ManagePricing = () => {
  const [pricingData, setPricingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPricing, setSelectedPricing] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Mô phỏng tải dữ liệu - trong thực tế, gọi API
    setTimeout(() => {
      setPricingData(samplePricing);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleEdit = (pricing) => {
    setSelectedPricing(pricing);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa gói này?')) {
      // Mô phỏng xóa - trong thực tế, gọi API
      setPricingData(prev => prev.filter(item => item.id !== id));
      toast.success('Đã xóa gói thành công!');
    }
  };

  const handleAdd = () => {
    setSelectedPricing({
      id: null,
      type: "",
      name: "",
      price: 0,
      stock: 0,
      isOnSale: false,
      originalPrice: null
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (selectedPricing.id) {
      // Cập nhật
      setPricingData(prev => prev.map(item => 
        item.id === selectedPricing.id ? selectedPricing : item
      ));
      toast.success('Cập nhật gói thành công!');
    } else {
      // Thêm mới
      const newId = Math.max(...pricingData.map(item => item.id)) + 1;
      setPricingData(prev => [...prev, { ...selectedPricing, id: newId }]);
      toast.success('Thêm gói mới thành công!');
    }
    setIsEditing(false);
    setSelectedPricing(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSelectedPricing(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedPricing(null);
  };

  return (
    <PageTransition>
      <motion.h1 
        className="page-title"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Quản lý bảng giá
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
            <CurrencyDollarIcon className="section-icon" />
            <h2>Bảng giá Key VIP</h2>
          </div>
          <button className="btn btn-sm" onClick={handleAdd}>
            <PlusIcon className="btn-icon-sm" />
            Thêm gói mới
          </button>
        </div>

        {isLoading ? (
          <div className="loading-indicator">Đang tải dữ liệu...</div>
        ) : (
          <>
            {isEditing ? (
              <div className="pricing-edit-form">
                <h3>{selectedPricing.id ? 'Chỉnh sửa gói' : 'Thêm gói mới'}</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="type">Mã gói</label>
                    <input
                      type="text"
                      id="type"
                      name="type"
                      value={selectedPricing.type}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="name">Tên gói</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={selectedPricing.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="price">Giá (VND)</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={selectedPricing.price}
                      onChange={handleChange}
                      required
                      min="0"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="stock">Số lượng</label>
                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      value={selectedPricing.stock}
                      onChange={handleChange}
                      required
                      min="0"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group checkbox-group">
                    <input
                      type="checkbox"
                      id="isOnSale"
                      name="isOnSale"
                      checked={selectedPricing.isOnSale}
                      onChange={handleChange}
                    />
                    <label htmlFor="isOnSale">Đang giảm giá</label>
                  </div>
                  
                  {selectedPricing.isOnSale && (
                    <div className="form-group">
                      <label htmlFor="originalPrice">Giá gốc (VND)</label>
                      <input
                        type="number"
                        id="originalPrice"
                        name="originalPrice"
                        value={selectedPricing.originalPrice || ''}
                        onChange={handleChange}
                        min="0"
                      />
                    </div>
                  )}
                </div>

                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                    Hủy
                  </button>
                  <button type="button" className="btn" onClick={handleSave}>
                    {selectedPricing.id ? 'Cập nhật' : 'Thêm mới'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="pricing-table">
                <table>
                  <thead>
                    <tr>
                      <th>Mã gói</th>
                      <th>Tên gói</th>
                      <th>Giá (VND)</th>
                      <th>Số lượng</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingData.map(pricing => (
                      <tr key={pricing.id}>
                        <td>{pricing.type}</td>
                        <td>{pricing.name}</td>
                        <td>
                          {pricing.price.toLocaleString()}
                          {pricing.isOnSale && pricing.originalPrice && (
                            <span className="original-price">{pricing.originalPrice.toLocaleString()}</span>
                          )}
                        </td>
                        <td>{pricing.stock}</td>
                        <td>
                          <span className={`status-badge ${pricing.isOnSale ? 'sale' : 'normal'}`}>
                            {pricing.isOnSale ? 'Giảm giá' : 'Bình thường'}
                          </span>
                        </td>
                        <td>
                          <div className="table-actions">
                            <button className="action-btn edit" onClick={() => handleEdit(pricing)}>
                              <PencilIcon className="action-icon" />
                            </button>
                            <button className="action-btn delete" onClick={() => handleDelete(pricing.id)}>
                              <TrashIcon className="action-icon" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
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

export default ManagePricing;
