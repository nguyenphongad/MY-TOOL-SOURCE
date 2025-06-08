import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ClipboardDocumentIcon, DocumentTextIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';
import PageTransition from '../components/PageTransition';
import { itemVariants } from '../components/AnimationConfig';

const KeyFree = () => {
  const [searchParams] = useSearchParams();
  const [keyText, setKeyText] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const text = searchParams.get('text');
    if (text) {
      setKeyText(text);
    }
  }, [searchParams]);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(keyText)
      .then(() => {
        toast.success('Đã sao chép key thành công!', {
          position: 'top-right',
          duration: 3000,
        });
      })
      .catch(() => {
        toast.error('Không thể sao chép key!', {
          position: 'top-right',
        });
      });
  };
  
  return (
    <PageTransition>
      <motion.h1 
        className="page-title"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Key FREE
      </motion.h1>
      
      <motion.div 
        className="content-section"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.02 }}
      >
        <p>KEY FREE TERMUX (HẠN SỬ DỤNG 1 NGÀY):</p>
        
        <div className="key-container">
          <div className="key-wrapper" onClick={copyToClipboard}>
            <div className="key-text">{keyText || 'Không có key'}</div>
            <button className="copy-button" onClick={(e) => {
              e.stopPropagation();
              copyToClipboard();
            }}>
              <ClipboardDocumentIcon className="icon" />
            </button>
          </div>
          <div className="key-hint">Nhấn vào key để sao chép</div>
        </div>
        
        {/* Thông tin chi tiết về key */}
        <div className="vip-key-info">
          <div className="info-item">
            <span className="info-label">Loại tool:</span>
            <span className="info-value">TOOL TERMUX</span>
          </div>
          <div className="info-item">
            <span className="info-label">Hạn sử dụng:</span>
            <span className="info-value">1 ngày</span>
          </div>
          <div className="info-item">
            <span className="info-label">Device:</span>
            <span className="info-value">ALL</span>
          </div>
        </div>
      </motion.div>
      
      <div className="navigation-blocks">
        <motion.div 
          className="navigation-block"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.15 }}
          onClick={() => navigate('/pricing')}
        >
          <CurrencyDollarIcon className="navigation-icon" />
          <h3>BẢNG GIÁ KEY VIP</h3>
          <p>Xem các gói Key VIP với nhiều ưu đãi</p>
        </motion.div>
        
        <motion.div 
          className="navigation-block"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.25 }}
          onClick={() => navigate('/guide')}
        >
          <DocumentTextIcon className="navigation-icon" />
          <h3>HƯỚNG DẪN CÀI TOOL</h3>
          <p>Học cách cài đặt và sử dụng tool</p>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default KeyFree;
