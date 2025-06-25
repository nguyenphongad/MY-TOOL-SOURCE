import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
// Trang công khai
import DownloadTool from './pages/DownloadTool';
import About from './pages/About';
import Guide from './pages/Guide';
import Support from './pages/Support';
import Pricing from './pages/Pricing';
import KeyFree from './pages/KeyFree';
import Login from './pages/Login';
// Trang admin
import Dashboard from './pages/admin/Dashboard';
import SellKeys from './pages/admin/SellKeys';
import TransactionHistory from './pages/admin/TransactionHistory'; // Import trang mới
// Trang root
import ManagePricing from './pages/root/ManagePricing';
import ManageKeys from './pages/root/ManageKeys';
import ManageAdmins from './pages/root/ManageAdmins';
import ManageMembers from './pages/root/ManageMembers';
// Guards và Providers
import { LoginGuard, AuthProvider } from './middleware/AuthMiddleware';
import { AdminGuard, RootGuard } from './middleware/RouteGuards';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.scss';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <Toaster position="top-right" richColors closeButton />
          <ScrollToTop />
          <Routes>
            {/* Trang login - được bảo vệ, chỉ hiển thị khi chưa đăng nhập */}
            <Route element={<LoginGuard />}>
              <Route path="/login" element={<Login />} />
            </Route>

            {/* Trang công khai */}
            <Route path="/" element={<Navigate to="/download" replace />} />
            <Route path="/download" element={<Layout><DownloadTool /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/guide" element={<Layout><Guide /></Layout>} />
            <Route path="/support" element={<Layout><Support /></Layout>} />
            <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
            <Route path="/keyfree" element={<Layout><KeyFree /></Layout>} />
            
            {/* Trang Admin - Yêu cầu quyền Admin hoặc Root */}
            <Route path="/manage" element={<AdminGuard />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="sell-keys" element={<SellKeys />} />
              <Route path="transactions" element={<TransactionHistory />} />
              {/* Đã xóa route key-detail */}
            </Route>
            
            {/* Trang Root - Chỉ Root mới có quyền truy cập */}
            <Route path="/manage" element={<RootGuard />}>
              <Route path="manage-pricing" element={<ManagePricing />} />
              <Route path="manage-keys" element={<ManageKeys />} />
              <Route path="admins" element={<ManageAdmins />} />
              <Route path="members" element={<ManageMembers />} />
            </Route>
            
            {/* Bắt các đường dẫn không tồn tại */}
            <Route path="*" element={<Navigate to="/download" replace />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;