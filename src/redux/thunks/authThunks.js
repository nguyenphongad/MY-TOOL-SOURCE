import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiCall } from '../../utils/axios';
import ENDPOINTS from '../../services/ENDPOINT';

// Thunk để đăng nhập
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiCall.post(ENDPOINTS.AUTH.LOGIN, credentials);
      
      // Kiểm tra success flag từ response
      if (!response.success) {
        // Nếu response không thành công, sử dụng message từ response
        return rejectWithValue(response.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
      }
      
      // Lưu token vào localStorage
      const { token, user } = response;
      localStorage.setItem('auth_token', token);
      
      return { user };
    } catch (error) {
      // Xử lý lỗi từ response
      let errorMessage = 'Đăng nhập thất bại. Vui lòng thử lại.';
      
      if (error.response) {
        // Lấy message từ response.data nếu có
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        // Không nhận được response từ server
        errorMessage = 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.';
      }
      
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk để đăng xuất
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Gọi API logout (nếu cần)
      await apiCall.post(ENDPOINTS.AUTH.LOGOUT);
      
      // Xóa token khỏi localStorage
      localStorage.removeItem('auth_token');
      
      return true;
    } catch (error) {
      // Xóa token dù có lỗi
      localStorage.removeItem('auth_token');
      
      return rejectWithValue(
        error.response?.data?.message || 'Có lỗi xảy ra khi đăng xuất'
      );
    }
  }
);

// Thunk để kiểm tra xem người dùng đã đăng nhập chưa
export const checkAuth = createAsyncThunk(
  'auth/check',
  async (_, { rejectWithValue }) => {
    try {
      // Kiểm tra token có tồn tại không
      const token = localStorage.getItem('auth_token');
      if (!token) {
        return rejectWithValue('Không tìm thấy token');
      }
      
      // Gọi API để lấy thông tin người dùng hiện tại
      const response = await apiCall.get(ENDPOINTS.AUTH.ME);
      
      // Kiểm tra success flag
      if (!response.success) {
        return rejectWithValue(response.message || 'Không thể lấy thông tin người dùng');
      }
      
      // Lấy thông tin user từ response.data
      const user = response.data;
      
      if (!user) {
        console.error('Không tìm được thông tin user trong response:', response);
        return rejectWithValue('Không tìm thấy thông tin người dùng');
      }
      
      // Trả về thông tin người dùng
      return { user };
    } catch (error) {
      console.error('checkAuth error:', error);
      // KHÔNG xóa token ở đây để tránh xóa token khi API lỗi tạm thời
      return rejectWithValue(
        error.response?.data?.message || 'Lỗi khi kiểm tra xác thực'
      );
    }
  }
);
  