import React from 'react';
import { motion } from 'framer-motion';

// Cập nhật hiệu ứng phóng to trang nhanh hơn
const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,  // Giảm hiệu ứng co lại ban đầu
  },
  in: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.08,  // Giảm thời gian xuống còn 150ms
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  out: {
    opacity: 0,
    scale: 1.02,  // Giảm hiệu ứng phóng to khi thoát
    transition: {
      duration: 0.08,  // Giảm thời gian xuống còn 150ms
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="page"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
