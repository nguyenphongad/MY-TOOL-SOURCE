import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Component này sẽ cuộn trang lên đầu khi route thay đổi
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Cuộn lên đầu trang mỗi khi path thay đổi
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Component này không render bất kỳ thứ gì
};

export default ScrollToTop;
