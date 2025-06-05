import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { itemVariants, buttonHoverProps } from '../components/AnimationConfig';

const Guide = () => {
  return (
    <PageTransition>
      <motion.h1 
        className="page-title"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Hướng Dẫn
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
        <motion.p>Hướng dẫn chi tiết về cách sử dụng công cụ của chúng tôi.</motion.p>
      </motion.div>
    </PageTransition>
  );
};

export default Guide;
