import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import './App.scss';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import DownloadTool from './pages/DownloadTool';
import About from './pages/About';
import Guide from './pages/Guide';
import Support from './pages/Support';
import Pricing from './pages/Pricing';
import KeyFree from './pages/KeyFree';

// Tạo một component con để sử dụng hook useLocation
const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <Layout>
      <ScrollToTop /> {/* Thêm ScrollToTop component ở đây */}
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navigate to="/download" />} />
          <Route path="/download" element={<DownloadTool />} />
          <Route path="/about" element={<About />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/support" element={<Support />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/keyfree" element={<KeyFree />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
};

function App() {
  return (
    <Router>
      <Toaster />
      <AppRoutes />
    </Router>
  );
}

export default App;
