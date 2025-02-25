import { Routes, Route } from "react-router-dom";
import Home from "../pages/screen/home";
import Store from "../pages/screen/store";
import News from "../pages/screen/news";
import Discount from "../pages/screen/discount";
import Introduce from "../pages/screen/introduce";
import Cart from "../pages/user_menu/cart";
import Profile from "../pages/user_menu/profile";
import Messenger from "../pages/user_menu/mess";
import Admin from "../pages/admin/admin";
import ProtectedRoute from "../components/protected_route";
import AdminRoute from "../components/admin_route"; // Thêm AdminRoute component
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import ForgotPassword from "../pages/auth/forgotPass";
import LoginAdmin from "../pages/admin/login_admin"; // Import trang login admin
import Header from "../components/header";

const RoutesConfig = () => (
  <Routes>
    <Route path="/" element={<><Header /><Home /></>} />
    <Route path="/store" element={<><Header /><Store /></>} />
    <Route path="/news" element={<><Header /><News /></>} />
    <Route path="/discount" element={<><Header /><Discount /></>} />
    <Route path="/introduce" element={<><Header /><Introduce /></>} />

    {/* Auth routes */}
    <Route path="/login" element={<><Header /><Login /></>} />
    <Route path="/register" element={<><Header /><Register /></>} />
    <Route path="/forgot-password" element={<><Header /><ForgotPassword /></>} />

    {/* Chỉ truy cập được khi đăng nhập */}
    <Route path="/cart" element={<ProtectedRoute><Header /><Cart /></ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute><Header /><Profile /></ProtectedRoute>} />
    <Route path="/mess" element={<ProtectedRoute><Header /><Messenger /></ProtectedRoute>} />

    {/* Admin routes */}
    <Route path="/admin/login" element={<LoginAdmin />} />
    <Route path="/admin/*" element={<ProtectedRoute isAdmin><Admin /></ProtectedRoute>} />
  </Routes>
);

export default RoutesConfig;
