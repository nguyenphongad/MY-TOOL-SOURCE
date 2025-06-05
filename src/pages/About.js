import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { itemVariants } from '../components/AnimationConfig';

const About = () => {
  return (
    <PageTransition>
      <motion.h1 
        className="page-title"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Giới Thiệu
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
        <motion.p>Thông tin về chúng tôi và sứ mệnh của chúng tôi.</motion.p>
      </motion.div>
    </PageTransition>
  );
};

export default About;
