import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 3 // Giảm từ 10px xuống 5px để hiệu ứng nhẹ nhàng hơn
  },
  in: {
    opacity: 1,
    y: 0
  },
  out: {
    opacity: 0,
    y: 3 // Giảm từ 10px xuống 5px để hiệu ứng nhẹ nhàng hơn
  }
};

const pageTransition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.1 // Giảm từ 0.3s xuống 0.2s để nhanh hơn
};

const PageTransition = ({ children }) => {
  return (
    <motion.div
      className="page"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
