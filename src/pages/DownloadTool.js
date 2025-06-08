import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DocumentTextIcon, 
  ArrowDownTrayIcon,
  XMarkIcon,
  ChevronDownIcon,
  LockClosedIcon,
  ClockIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import PageTransition from '../components/PageTransition';
import { itemVariants, buttonHoverProps } from '../components/AnimationConfig';
import downloadData from '../assets/data/download-data.json';

// Import icons
import termuxIcon from '../assets/termux_icon.png';
import zarchiverIcon from '../assets/zarchiver.webp';

// Component hiển thị card download cho ứng dụng cần thiết
const AppCard = ({ app }) => {
  // Get the appropriate icon based on app id
  const getAppIcon = () => {
    switch(app.id) {
      case 'termux':
        return termuxIcon;
      case 'zarchiver':
        return zarchiverIcon;
      default:
        return null;
    }
  };
  
  return (
    <a 
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      className="app-card"
    >
      <motion.div 
        className="download-card app-card"
        variants={itemVariants}
        whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
      >
        <div className="file-icon app-icon">
          <img src={getAppIcon()} alt={`${app.name} icon`} className="app-icon-image" />
        </div>
        <div className="file-info">
          <h3>{app.name}</h3>
          <p>{app.description}</p>
          <span className="file-size">{app.size}</span>
        </div>
        <div className="download-icon google-play-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3.609 1.814L13.792 12 3.609 22.186c-.181.181-.45.294-.684.294-.143 0-.265-.04-.376-.126-.245-.172-.353-.495-.353-.853v-19c0-.358.107-.681.353-.853.111-.087.233-.126.376-.126.234 0 .503.113.684.294zm10.831 9.614l2.387-2.387-7.377-4.045c-.048-.263.345-.296.345-.296l7.862 4.354-3.217 2.374zm-.982 1.152l-7.584 7.584c-.038 0-.368-.359-.323-.402l7.907-7.182zm-1.684-1.684l-6.91-6.909c-.163-.162-.149-.362-.011-.399l6.921 6.921-6.917 6.916c-.139-.136-.153-.337.009-.398l6.908-6.131z" />
          </svg>
        </div>
      </motion.div>
    </a>
  );
};

// Component hiển thị card download cho tool chính
const DownloadCard = ({ file, isVersionLocked = false }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <motion.div 
          className={`download-card ${file.isMainFile ? 'main-file' : 'secondary-file'} ${isVersionLocked ? 'locked' : ''}`}
          variants={itemVariants}
          whileHover={!isVersionLocked ? { y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' } : {}}
        >
          <div className="file-icon">
            <DocumentTextIcon />
          </div>
          <div className="file-info">
            <h3>{file.name}</h3>
            <p>{file.description}</p>
            <span className="file-size">{file.size}</span>
          </div>
          <div className="download-icon">
            {isVersionLocked ? 
              <LockClosedIcon className="lock-icon" /> : 
              <ArrowDownTrayIcon />
            }
          </div>
        </motion.div>
      </Dialog.Trigger>
      
      {!isVersionLocked && (
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="dialog-content">
            <div className="dialog-header">
              <Dialog.Title className="dialog-title">Tải xuống {file.name}</Dialog.Title>
              <Dialog.Close asChild>
                <button className="dialog-close-btn">
                  <XMarkIcon className="icon" />
                </button>
              </Dialog.Close>
            </div>
            <div className="dialog-body">
              <p>Bạn có muốn tải xuống file {file.name} ({file.size})?</p>
            </div>
            <div className="dialog-footer">
              <Dialog.Close asChild>
                <button className="btn btn-cancel">Huỷ</button>
              </Dialog.Close>
              <Link 
                to={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                Tải xuống
              </Link>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      )}
    </Dialog.Root>
  );
};

// Component hiển thị phiên bản tool
const VersionBlock = ({ version }) => {
  const [expanded, setExpanded] = useState(version.isLatest);
  const isLocked = !version.isAcceptDownload;
  
  return (
    <div className={`version-block ${version.isLatest ? 'latest-version' : ''} ${isLocked ? 'locked-version' : ''}`}>
      <div className="version-header" onClick={() => setExpanded(!expanded)}>
        <div className="version-info">
          <h3>
            {version.version.toUpperCase()} 
            {version.isLatest && <span className="version-badge latest">Mới nhất</span>}
            {isLocked && <span className="version-badge locked">Đã khóa</span>}
          </h3>
          <div className="version-meta">
            <div className="version-date">
              <ClockIcon className="meta-icon" />
              <span>{version.releaseDate}</span>
            </div>
            <div className="version-req">
              <CodeBracketIcon className="meta-icon" />
              <span>{version.requirements}</span>
            </div>
          </div>
        </div>
        <ChevronDownIcon className={`expand-icon ${expanded ? 'expanded' : ''}`} />
      </div>
      
      {expanded && (
        <div className="version-content">
          {version.features && (
            <div className="version-features">
              <h4>Tính năng mới</h4>
              <ul>
                {version.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="version-files">
            {version.files.map(file => (
              <DownloadCard key={file.id} file={file} isVersionLocked={isLocked} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Component chính
const DownloadTool = () => {  
  return (
    <PageTransition>
      <motion.h1 
        className="page-title"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Tải Tool
      </motion.h1>
      
      <motion.div 
        className="content-section"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.05 }}
      >
        <h2 className="section-title">Ứng dụng cần thiết</h2>
        <p>Vui lòng cài đặt các ứng dụng sau từ Google Play để đảm bảo tool hoạt động tốt:</p>
        
        <div className="common-tools">
          {downloadData.commonTools.map(app => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      </motion.div>
      
      <motion.div 
        className="content-section"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.15 }}
      >
        <h2 className="section-title">Phiên bản MY TOOL</h2>
        
        <div className="versions-container">
          {downloadData.toolVersions.map(version => (
            <VersionBlock key={version.version} version={version} />
          ))}
        </div>
        
        <div className="download-note">
          <p>Sau khi tải xuống, vui lòng làm theo <Link to="/guide">hướng dẫn cài đặt</Link> để sử dụng tool hiệu quả.</p>
        </div>
      </motion.div>
    </PageTransition>
  );
};

export default DownloadTool;
