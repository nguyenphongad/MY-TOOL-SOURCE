import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import MyToolLogo from '../components/MyToolLogo';
import { itemVariants } from '../components/AnimationConfig';

const Home = () => {
  return (
    <PageTransition>
      <motion.div 
        className="logo-container"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        style={{ minHeight: '100vh' }}
      >
        <MyToolLogo className="home-logo" />
      </motion.div>
    </PageTransition>
  );
};

export default Home;
