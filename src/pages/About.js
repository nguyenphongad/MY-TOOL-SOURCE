import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UserGroupIcon, CurrencyDollarIcon, SparklesIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import PageTransition from '../components/PageTransition';
import { itemVariants } from '../components/AnimationConfig';

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div 
      className="feature-card"
      variants={itemVariants}
      whileHover={{ y: -5, boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}
    >
      <div className="feature-icon">
        <Icon />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.div>
  );
};

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
        className="content-section about-intro"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{
          delay: 0.05
        }}
      >
        <h2 className="section-title">Group MY TOOL</h2>
        <p>
          Chúng tôi là nhóm phát triển các công cụ auto cho các app kiếm tiền phổ biến như GoLike, TDS (TraoDoiSub), TuongTacCheo và các ứng dụng tương tự. MY TOOL được tạo ra với sứ mệnh giúp người dùng tối ưu hóa thu nhập từ các nền tảng này một cách hiệu quả và an toàn nhất.
        </p>
        
        <div className="about-image">
          <img src="/my-tool-team.jpg" alt="MY TOOL Team" 
          onError={(e) => {
            e.target.style.display = 'none';
          }} />
        </div>
      </motion.div>

      <motion.div 
        className="content-section"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{
          delay: 0.15
        }}
      >
        <h2 className="section-title">Tính năng nổi bật</h2>
        <div className="features-grid">
          <FeatureCard 
            icon={SparklesIcon}
            title="Auto Thông Minh" 
            description="Công nghệ auto tiên tiến, giúp tự động hóa các tương tác mà không bị phát hiện bởi hệ thống" 
          />
          <FeatureCard 
            icon={UserGroupIcon}
            title="Hỗ Trợ Đa Nền Tảng" 
            description="Hỗ trợ nhiều nền tảng phổ biến như GoLike, TDS, TuongTacCheo và nhiều nền tảng khác" 
          />
          <FeatureCard 
            icon={RocketLaunchIcon}
            title="Hiệu Năng Cao" 
            description="Tối ưu hóa hiệu suất, chạy được nhiều tài khoản cùng lúc mà không gặp vấn đề" 
          />
          <FeatureCard 
            icon={CurrencyDollarIcon}
            title="Tăng Thu Nhập" 
            description="Giúp bạn tối đa hóa lợi nhuận từ các nền tảng kiếm tiền online một cách hiệu quả" 
          />
        </div>
      </motion.div>
      
      <motion.div 
        className="content-section about-cta"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{
          delay: 0.25
        }}
      >
        <h2 className="section-title">Bắt đầu ngay</h2>
        <p>
          MY TOOL là công cụ tốt nhất hiện nay để auto các ứng dụng kiếm tiền. Chúng tôi luôn cập nhật và phát triển thêm các tính năng mới để đáp ứng nhu cầu của người dùng.
        </p>
        <div className="cta-buttons">
          <Link to="/download" className="btn cta-btn">
            Tải Tool ngay
          </Link>
          <Link to="/guide" className="btn cta-btn-secondary">
            Xem hướng dẫn
          </Link>
        </div>
      </motion.div>
    </PageTransition>
  );
};

export default About;
