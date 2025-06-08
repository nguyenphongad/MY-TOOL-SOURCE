// Cấu hình hiệu ứng animation chung cho các component

export const itemVariants = {
  hidden: { opacity: 0, y: 3 }, // Giảm từ 20px xuống 5px
  visible: { opacity: 1, y: 0, transition: { duration: 0.07 } } // Giảm từ 0.3s xuống 0.15s
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.05, // Giảm từ 0.1s xuống 0.05s
      duration: 0.07 // Giảm thời gian hiển thị
    } 
  }
};

export const buttonHoverProps = {
  whileHover: { 
    scale: 1.03, // Giảm từ 1.05 xuống 1.03
    transition: { duration: 0.15 } // Giảm từ 0.3s xuống 0.15s
  },
  whileTap: { 
    scale: 0.98, 
    transition: { duration: 0.1 } // Giảm từ 0.2s xuống 0.1s
  }
};

export const cardHoverProps = {
  whileHover: { 
    y: -4, // Giảm từ -5px xuống -4px
    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
    transition: { duration: 0.15 } // Giảm từ 0.3s xuống 0.15s
  }
};
