import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { itemVariants, buttonHoverProps, containerVariants } from '../components/AnimationConfig';

const Home = () => {
  return (
    <PageTransition>
      <motion.h1 
        className="page-title"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Trang Chủ
      </motion.h1>

      <motion.div 
        className="content-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={itemVariants}>
          Chào mừng bạn đến với ứng dụng của chúng tôi!
        </motion.p>
        <motion.button 
          className="btn" 
          variants={itemVariants}
          {...buttonHoverProps}
        >
          Khám Phá Ngay
        </motion.button>
      </motion.div>
    </PageTransition>
  );
};

export default Home;
