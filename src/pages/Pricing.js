import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { itemVariants, buttonHoverProps, containerVariants, cardHoverProps } from '../components/AnimationConfig';

const Pricing = () => {
  return (
    <PageTransition>
      <motion.h1 
        className="page-title"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Bảng Giá
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
        <motion.p>Thông tin về giá cả và các gói dịch vụ của chúng tôi.</motion.p>
        
        <motion.div 
          className="pricing-cards"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="pricing-card"
            variants={itemVariants}
            {...cardHoverProps}
          >
            <h3>Gói Cơ Bản</h3>
            <p className="price">199.000đ</p>
            <motion.button 
              className="btn"
              {...buttonHoverProps}
            >
              Đăng ký
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="pricing-card"
            variants={itemVariants}
            {...cardHoverProps}
          >
            <h3>Gói Nâng Cao</h3>
            <p className="price">399.000đ</p>
            <motion.button 
              className="btn"
              {...buttonHoverProps}
            >
              Đăng ký
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="pricing-card"
            variants={itemVariants}
            {...cardHoverProps}
          >
            <h3>Gói Chuyên Nghiệp</h3>
            <p className="price">699.000đ</p>
            <motion.button 
              className="btn"
              {...buttonHoverProps}
            >
              Đăng ký
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </PageTransition>
  );
};

export default Pricing;
