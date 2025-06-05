import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './App.scss';
import Layout from './components/Layout';
import Home from './pages/Home';
import DownloadTool from './pages/DownloadTool';
import About from './pages/About';
import Guide from './pages/Guide';
import Support from './pages/Support';
import Pricing from './pages/Pricing';

// Tạo một component con để sử dụng hook useLocation
const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <Layout>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/download" element={<DownloadTool />} />
          <Route path="/about" element={<About />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/support" element={<Support />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
