import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { itemVariants, buttonHoverProps } from '../components/AnimationConfig';

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
        transition={{
          delay: 0.05
        }}
      >
        <motion.p>Tải các công cụ hữu ích tại đây.</motion.p>
        <motion.button 
          className="btn"
          {...buttonHoverProps}
        >
          Tải xuống
        </motion.button>
      </motion.div>
    </PageTransition>
  );
};

export default DownloadTool;
