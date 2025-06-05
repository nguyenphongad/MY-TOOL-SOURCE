// Cấu hình animation chung cho toàn bộ ứng dụng
export const itemVariants = {
  hidden: { opacity: 0, y: 8 },  // Giảm khoảng cách dịch chuyển
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,  // Giảm thời gian xuống còn 200ms
      ease: "easeOut"
    }
  }
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03  // Giảm thời gian giãn cách xuống 30ms
    }
  }
};

export const buttonHoverProps = {
  whileHover: { 
    scale: 1.03, 
    boxShadow: "0 5px 15px rgba(11, 118, 160, 0.2)",
    transition: { duration: 0.15 }  // Làm cho hiệu ứng hover nhanh hơn
  },
  whileTap: { 
    scale: 0.97, 
    transition: { duration: 0.08 }  // Làm cho hiệu ứng tap nhanh hơn
  }
};

export const cardHoverProps = {
  whileHover: { 
    y: -3,
    boxShadow: "0 8px 20px rgba(11, 118, 160, 0.15)",
    transition: { duration: 0.15 }  // Làm cho hiệu ứng hover nhanh hơn
  }
};
