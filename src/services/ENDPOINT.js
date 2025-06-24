// Định nghĩa tất cả các endpoint API được sử dụng trong ứng dụng
const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  USER: {
    GET_PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
  },
  // Thêm các endpoint khác tùy theo nhu cầu của ứng dụng
};

export default ENDPOINTS;
