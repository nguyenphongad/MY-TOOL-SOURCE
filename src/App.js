import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import DownloadTool from './pages/DownloadTool';
import About from './pages/About';
import Guide from './pages/Guide';
import Support from './pages/Support';
import Pricing from './pages/Pricing';
import KeyFree from './pages/KeyFree';
import Login from './pages/Login';
import { LoginGuard, AuthProvider } from './middleware/AuthMiddleware';
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

            {/* Trang chính và các trang công khai */}
            <Route path="/" element={<Navigate to="/download" replace />} />
            <Route path="/download" element={<Layout><DownloadTool /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/guide" element={<Layout><Guide /></Layout>} />
            <Route path="/support" element={<Layout><Support /></Layout>} />
            <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
            <Route path="/keyfree" element={<Layout><KeyFree /></Layout>} />
            
            {/* Bắt các đường dẫn không tồn tại */}
            <Route path="*" element={<Navigate to="/download" replace />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;