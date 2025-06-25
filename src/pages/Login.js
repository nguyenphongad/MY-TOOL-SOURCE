import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom'; // Thêm useLocation
import { toast } from 'sonner';
import MyToolLogo from '../components/MyToolLogo';
import { resetError } from '../redux/slices/authSlice';
import { login } from '../redux/thunks/authThunks';

const Login = () => {
   const [credentials, setCredentials] = useState({
      username: 'root_admin',
      password: 'root2003@'
   });
   const [showPassword, setShowPassword] = useState(false);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const location = useLocation(); // Lấy thông tin location hiện tại

   const { isAuthenticated, isLoading, error, user } = useSelector((state) => state.auth);

   useEffect(() => {
      // Nếu đã đăng nhập, hiện thông báo chào mừng và redirect dựa vào role
      if (isAuthenticated && user) {
         toast.success(`Đăng nhập thành công. Xin chào ${user.fullName || user.username}`);
         
         // Kiểm tra xem có "from" trong state không để chuyển hướng về trang trước đó
         const from = location.state?.from || '/download';
         
         // Nếu có from và from là trang admin/root phù hợp với role
         if (from.includes('/manage/') && (user.role === 'admin' || user.role === 'root')) {
            navigate(from);
         } 
         // Nếu không, chuyển hướng dựa trên role mặc định
         else if (user.role === 'root' || user.role === 'admin') {
            navigate('/manage/dashboard');
         } else {
            navigate('/download');
         }
      }
   }, [isAuthenticated, navigate, user, location]);

   // Hiển thị lỗi qua toast khi có error
   useEffect(() => {
      if (error) {
         toast.error(error);
         dispatch(resetError());
      }
   }, [error, dispatch]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setCredentials({
         ...credentials,
         [name]: value
      });
   };

   const handleSubmit = (e) => {
      if (e) {
         e.preventDefault(); // Đảm bảo ngăn chặn hành vi mặc định, nếu có
         e.stopPropagation(); // Ngăn chặn sự kiện lan truyền
      }
      
      // Gọi thunk action để đăng nhập
      dispatch(login(credentials));
   };

   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

   return (
      <div className="login-page">
         <div className="login-container">
            <div className="login-logo">
               <div className="logo-header">
                  <MyToolLogo />
                  <h1>MY TOOL</h1>
               </div>
            </div>

            <h1 className="login-title">Đăng nhập</h1>

            <div className="login-form-container">
               <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                     type="text"
                     id="username"
                     name="username"
                     value={credentials.username}
                     onChange={handleChange}
                     placeholder="Enter username"
                     required
                     className="text-center"
                     disabled={isLoading}
                  />
               </div>

               <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="password-field">
                     <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        required
                        className="text-center"
                        disabled={isLoading}
                     />
                     <button
                        type="button"
                        className="password-toggle"
                        onClick={togglePasswordVisibility}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        disabled={isLoading}
                     >
                        {showPassword ? (
                           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                              <line x1="2" y1="2" x2="22" y2="22"></line>
                           </svg>
                        ) : (
                           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                           </svg>
                        )}
                     </button>
                  </div>
               </div>

               <button
                  onClick={handleSubmit}
                  className="btn-login"
                  disabled={isLoading}
                  type="button" // Đảm bảo rằng đây là button thông thường, không phải submit
               >
                  {isLoading ? 'Loading...' : 'Đăng nhập'}
               </button>
            </div>
         </div>
      </div>
   );
};

export default Login;