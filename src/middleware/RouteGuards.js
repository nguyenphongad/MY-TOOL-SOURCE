import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';

/**
 * AdminGuard: Bảo vệ các route admin, chỉ cho phép truy cập khi đã đăng nhập và có quyền admin/root
 */
export const AdminGuard = () => {
  const { isAuthenticated, user, isLoading } = useSelector(state => state.auth);
  const location = useLocation();

  // Hiển thị trạng thái loading trong quá trình kiểm tra xác thực
  if (isLoading) {
    return (
      <Layout>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Đang kiểm tra quyền truy cập...</p>
        </div>
      </Layout>
    );
  }

  // Kiểm tra đăng nhập và quyền admin
  if (!isAuthenticated) {
    // Lưu lại đường dẫn hiện tại để sau khi đăng nhập có thể quay lại
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Kiểm tra quyền admin hoặc root
  if (user?.role !== 'admin' && user?.role !== 'root') {
    return <Navigate to="/download" replace />;
  }

  // Nếu có quyền admin hoặc root, cho phép truy cập
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

/**
 * RootGuard: Bảo vệ các route root, chỉ cho phép truy cập khi đã đăng nhập và có quyền root
 */
export const RootGuard = () => {
  const { isAuthenticated, user, isLoading } = useSelector(state => state.auth);
  const location = useLocation();

  // Hiển thị trạng thái loading trong quá trình kiểm tra xác thực
  if (isLoading) {
    return (
      <Layout>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Đang kiểm tra quyền truy cập...</p>
        </div>
      </Layout>
    );
  }

  // Kiểm tra đăng nhập
  if (!isAuthenticated) {
    // Lưu lại đường dẫn hiện tại để sau khi đăng nhập có thể quay lại
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Kiểm tra quyền root
  if (user?.role !== 'root') {
    return <Navigate to="/download" replace />;
  }

  // Nếu có quyền root, cho phép truy cập
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
