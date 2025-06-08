import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChatBubbleLeftRightIcon, 
  UserGroupIcon, 
  PhoneIcon, 
  PaperAirplaneIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import * as Dialog from '@radix-ui/react-dialog';
import { toast } from 'sonner';
import PageTransition from '../components/PageTransition';
import { itemVariants, buttonHoverProps } from '../components/AnimationConfig';
import zaloLogoImage from '../assets/zalo-logo.png';
import telegramLogoImage from '../assets/telegram-logo.png';

// Component form đóng góp ý kiến
const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form submission
    toast.success('Cảm ơn bạn đã đóng góp ý kiến!', {
      position: 'top-right',
      duration: 3000,
    });
    
    // Reset form
    setName('');
    setFeedback('');
    
    // Close dialog
    document.querySelector('.dialog-close-btn').click();
  };
  
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <motion.button 
          className="btn"
          {...buttonHoverProps}
        >
          Đóng góp
        </motion.button>
      </Dialog.Trigger>
      
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content feedback-dialog">
          <div className="dialog-header">
            <Dialog.Title className="dialog-title">Đóng góp ý kiến</Dialog.Title>
            <Dialog.Close asChild>
              <button className="dialog-close-btn">
                <XMarkIcon className="icon" />
              </button>
            </Dialog.Close>
          </div>
          
          <form className="feedback-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Tên của bạn</label>
              <input 
                type="text" 
                id="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập tên của bạn"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="feedback">Lời đóng góp</label>
              <textarea 
                id="feedback" 
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Nhập ý kiến đóng góp của bạn..."
                rows={5}
                required
              ></textarea>
            </div>
            
            <div className="form-actions">
              <Dialog.Close asChild>
                <button type="button" className="btn btn-cancel">Huỷ</button>
              </Dialog.Close>
              <button type="submit" className="btn">
                <PaperAirplaneIcon className="btn-icon" />
                Gửi đóng góp
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const Support = () => {
  return (
    <PageTransition>
      <motion.h1 
        className="page-title"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Hỗ Trợ
      </motion.h1>
      
      <motion.div 
        className="content-section"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.02 }} // Giảm từ 0.05s xuống 0.02s
      >
        <h2 className="section-title">
          <UserGroupIcon className="section-icon" />
          Tham gia cộng đồng
        </h2>
        
        <div className="social-groups-container">
          {/* Zalo Group */}
          <a 
            href="https://zalo.me/g/splbbl769" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-group-card zalo-group-card"
          >
            <div className="social-group-logo zalo-group-logo">
              <img src={zaloLogoImage} alt="Zalo Logo" />
            </div>
            <div className="social-group-content">
              <h3>CỘNG ĐỒNG MY TOOL (AUTO GOLIKE, TDS)</h3>
              <p>Tham gia nhóm Zalo để được hỗ trợ nhanh chóng và chia sẻ kinh nghiệm với cộng đồng người dùng</p>
              <div className="social-group-button zalo-group-button">
                <UserGroupIcon className="icon" />
                Tham gia ngay
              </div>
            </div>
          </a>
          
          {/* Telegram Group */}
          <a 
            href="https://t.me/mytoolvnew" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-group-card telegram-group-card"
          >
            <div className="social-group-logo telegram-group-logo">
              <img src={telegramLogoImage} alt="Telegram Logo" />
            </div>
            <div className="social-group-content">
              <h3>CỘNG ĐỒNG MY TOOL</h3>
              <p>Theo dõi kênh Telegram để cập nhật tin tức mới nhất và nhận thông báo về các phiên bản mới của tool</p>
              <div className="social-group-button telegram-group-button">
                <UserGroupIcon className="icon" />
                Tham gia ngay
              </div>
            </div>
          </a>
        </div>
      </motion.div>
      
      <motion.div 
        className="content-section"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.05 }} // Giảm từ 0.15s xuống 0.05s
      >
        <h2 className="section-title">
          <ChatBubbleLeftRightIcon className="section-icon" />
          Đóng góp nâng cấp tool
        </h2>

        <div className="support-form">
          <h3>Gửi ý kiến đóng góp</h3>
          <p>Chúng tôi rất mong nhận được ý kiến đóng góp của bạn để cải thiện tool ngày càng tốt hơn.</p>
          <FeedbackForm />
        </div>
      </motion.div>
    </PageTransition>
  );
};

export default Support;
