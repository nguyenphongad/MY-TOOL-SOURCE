import React from 'react';
import { motion } from 'framer-motion';
import { QrCodeIcon, DevicePhoneMobileIcon, ComputerDesktopIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import * as Dialog from '@radix-ui/react-dialog';
import { toast } from 'sonner';
import PageTransition from '../components/PageTransition';
import { itemVariants, buttonHoverProps, containerVariants, cardHoverProps } from '../components/AnimationConfig';
import QRCodeImage from '../assets/qr_buy_key_phong.jpg';
import pricingData from '../assets/data/pricing-data.json';
import freeVipKey from '../assets/data/free-vip-key.json';

// Component hiển thị Free VIP Key Box
const FreeVIPKeyBox = () => {
  // Lọc các key đang active
  const activeKeys = freeVipKey.vipKeys.filter(key => key.active);
  
  // Nếu không có key active nào, không hiển thị box
  if (activeKeys.length === 0) {
    return null;
  }
  
  const copyToClipboard = (keyText) => {
    navigator.clipboard.writeText(keyText)
      .then(() => {
        toast.success('Đã sao chép key VIP thành công!', {
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
    <>
      {activeKeys.map((keyInfo, index) => (
        <motion.div
          key={index}
          className="content-section vip-key-gift"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.02 + (index * 0.05) }} // Giảm từ 0.05s + 0.1s xuống 0.02s + 0.05s
        >
          <h2 className="vip-key-title">{freeVipKey.title}</h2>
          
          <div className="key-container">
            <div className="key-wrapper vip-key" onClick={() => copyToClipboard(keyInfo.key)}>
              <div className="key-text">{keyInfo.key}</div>
              <button className="copy-button" onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(keyInfo.key);
              }}>
                <ClipboardDocumentIcon className="icon" />
              </button>
            </div>
            <div className="key-hint">Nhấn vào key để sao chép</div>
          </div>
          
          <div className="vip-key-info">
            <div className="info-item">
              <span className="info-label">Loại tool:</span>
              <span className="info-value">{keyInfo.type}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Hạn sử dụng:</span>
              <span className="info-value">{keyInfo.expiration}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Device:</span>
              <span className="info-value">{keyInfo.device}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
};

// Component hiển thị QR Code Dialog
const QRCodeDialog = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <motion.button 
          className="qr-code-btn"
        >
          <QrCodeIcon className="btn-icon" />
          Mã QR Zalo
        </motion.button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <div className="dialog-header">
            <Dialog.Title className="dialog-title">Liên hệ qua Zalo</Dialog.Title>
            <Dialog.Close asChild>
              <button className="dialog-close-btn">&times;</button>
            </Dialog.Close>
          </div>
          <div className="dialog-body">
            <div className="qr-code-container">
              <img src={QRCodeImage} alt="Zalo QR Code" className="qr-code-image" />
            </div>
            <div className="contact-info">
              <h3>Nguyễn Văn Phong</h3>
              <p>Zalo: 0886211356</p>
              <p className="contact-note">* ib admin kèm gói key + deviceID để mua key vip, có bảo hành.</p>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

// Component hiển thị một gói sản phẩm
const PricingCard = ({ packageInfo }) => {
  const { name, price, isSale, isOutOfStock, originalPrice, quantity } = packageInfo;
  
  return (
    <motion.div 
      className={`pricing-card ${isSale ? 'sale-card' : ''} ${isOutOfStock ? 'out-of-stock' : ''}`}
      variants={itemVariants}
      {...cardHoverProps}
    >
      {isSale && <div className="sale-badge">SALE</div>}
      {isOutOfStock && <div className="out-of-stock-badge">HẾT HÀNG</div>}
      
      <div className="card-content">
        <h3>{name}</h3>
        
        {isSale && originalPrice && (
          <p className="original-price">{originalPrice}</p>
        )}
        
        <p className="price">{price}</p>
        
        <p className="quantity-info">Còn lại: {quantity} key</p>
        
      </div>
      
      <div className="card-action">
        {/* Ẩn nút mua ngay
        <motion.button 
          className="btn buy-btn"
          disabled={isOutOfStock}
          {...buttonHoverProps}
        >
          <ShoppingCartIcon className="btn-icon" />
          {isOutOfStock ? "Tạm hết hàng" : "Mua ngay"}
        </motion.button>
        */}
        <QRCodeDialog />
      </div>
    </motion.div>
  );
};

// Component hiển thị nhóm sản phẩm
const PricingGroup = ({ groupData, delay, icon: Icon }) => {
  const { title, packages } = groupData;
  
  return (
    <>
      <motion.h2 
        className="pricing-category"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay }}
      >
        <Icon className="category-icon" />
        {title}
      </motion.h2>
      
      <motion.div 
        className="pricing-cards"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: delay + 0.05 }} // Giảm từ 0.1s xuống 0.05s
      >
        {packages.map(pkg => (
          <PricingCard key={pkg.id} packageInfo={pkg} />
        ))}
      </motion.div>
    </>
  );
};

const Pricing = () => {
  return (
    <PageTransition>
      <motion.h1 
        className="page-title"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Bảng Giá Key VIP
      </motion.h1>
      
      {/* Box tặng key VIP */}
      <FreeVIPKeyBox />
      
      <motion.div 
        className="content-section"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.02 }} // Giảm từ 0.05s xuống 0.02s
      >
        <PricingGroup 
          groupData={pricingData.termux} 
          delay={0} 
          icon={DevicePhoneMobileIcon} 
        />
        <PricingGroup 
          groupData={pricingData.pc} 
          delay={0.05} // Giảm từ 0.2s xuống 0.05s
          icon={ComputerDesktopIcon} 
        />
      </motion.div>
    </PageTransition>
  );
};

export default Pricing;
