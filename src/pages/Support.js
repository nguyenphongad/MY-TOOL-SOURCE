import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { itemVariants, buttonHoverProps } from '../components/AnimationConfig';

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
        transition={{
          delay: 0.05
        }}
      >
        <motion.p>Liên hệ với chúng tôi để được hỗ trợ.</motion.p>
        <motion.button 
          className="btn"
          {...buttonHoverProps}
        >
          Gửi yêu cầu hỗ trợ
        </motion.button>
      </motion.div>
    </PageTransition>
  );
};

export default Support;
