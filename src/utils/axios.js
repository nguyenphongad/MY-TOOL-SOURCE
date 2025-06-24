import axios from 'axios';
import { toast } from 'sonner';

// Tạo instance của axios với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor để xử lý request
axiosInstance.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage nếu có
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm interceptor để xử lý response
axiosInstance.interceptors.response.use(
  (response) => {
    // Return response.data trực tiếp thay vì response đầy đủ
    return response.data;
  },
  async (error) => {
    // Xử lý lỗi 401 Unauthorized (token hết hạn)
    if (error.response && error.response.status === 401) {
      // Xóa token và đăng xuất người dùng
      localStorage.removeItem('auth_token');
      // Redirect về trang đăng nhập
    //   window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Hàm trợ giúp để gọi API dễ dàng hơn
export const apiCall = {
  get: (url, config = {}) => axiosInstance.get(url, config),
  post: (url, data, config = {}) => axiosInstance.post(url, data, config),
  put: (url, data, config = {}) => axiosInstance.put(url, data, config),
  delete: (url, config = {}) => axiosInstance.delete(url, config),
  patch: (url, data, config = {}) => axiosInstance.patch(url, data, config),
};

export default axiosInstance;
