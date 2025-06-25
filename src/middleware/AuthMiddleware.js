import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { checkAuth } from '../redux/thunks/authThunks';
import { jwtDecode } from 'jwt-decode'; // Nếu chưa cài đặt, hãy cài đặt: npm install jwt-decode

/**
 * Kiểm tra token có hợp lệ hoặc hết hạn hay không
 * @returns {Object} { isValid, token }
 */
const checkValidToken = () => {
  const token = localStorage.getItem('auth_token');
  
  if (!token) {
    return { isValid: false, token: null };
  }
  
  try {
    // Giải mã token để kiểm tra hạn sử dụng
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    // Kiểm tra nếu token đã hết hạn
    if (decodedToken.exp < currentTime) {
      // Token đã hết hạn, xóa khỏi localStorage
      localStorage.removeItem('auth_token');
      return { isValid: false, token: null };
    }
    
    // Token hợp lệ
    return { isValid: true, token };
  } catch (error) {
    // Lỗi khi giải mã token, xóa token không hợp lệ
    localStorage.removeItem('auth_token');
    return { isValid: false, token: null };
  }
};

/**
 * LoginGuard: Bảo vệ route login, chỉ cho phép truy cập khi chưa đăng nhập
 */
export const LoginGuard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasValidToken, setHasValidToken] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokenAndAuth = async () => {
      const { isValid, token } = checkValidToken();
      
      if (isValid && token) {
        // Nếu token hợp lệ, cập nhật Redux store
        try {
          await dispatch(checkAuth()).unwrap();
          setHasValidToken(true);
        } catch (error) {
          // Không xóa token ở đây nữa, chỉ cập nhật state
          console.log('Lỗi kiểm tra token:', error);
          setHasValidToken(false);
        }
      } else {
        setHasValidToken(false);
      }
      
      setIsLoading(false);
    };

    checkTokenAndAuth();
  }, [dispatch]);

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Đang kiểm tra...</div>;
  }

  // Nếu có token hợp lệ, chuyển hướng khỏi trang login
  if (hasValidToken) {
    return <Navigate to="/download" replace />;
  }

  // Nếu không có token hợp lệ, cho phép vào trang login
  return <Outlet />;
};

/**
 * AuthProvider: Kiểm tra token và cập nhật trạng thái đăng nhập
 * Nhưng KHÔNG chặn quyền truy cập vào bất kỳ trang nào
 */
export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [isInitializing, setIsInitializing] = useState(true);
  const { isAuthenticated } = useSelector(state => state.auth);
  const location = useLocation();

  useEffect(() => {
    const initializeAuth = async () => {
      const { isValid } = checkValidToken();
      
      if (isValid) {
        // Nếu có token hợp lệ, cập nhật Redux store
        try {
          await dispatch(checkAuth()).unwrap();
        } catch (error) {
          // Không xóa token nếu API lỗi
          console.log('Lỗi khởi tạo xác thực:', error);
        }
      }
      
      setIsInitializing(false);
    };

    initializeAuth();
  }, [dispatch]);

  // Hiển thị loading chỉ khi đang khởi tạo và đang ở trang yêu cầu xác thực
  if (isInitializing && (location.pathname.includes('/manage/') || location.pathname.includes('/admin/'))) {
    return <div className="auth-loading">Đang kiểm tra xác thực...</div>;
  }

  // Luôn render children sau khi hoàn tất khởi tạo
  return children;
};
