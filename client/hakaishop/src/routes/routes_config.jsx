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
import ProtectedRoute from "./protected_route";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import ForgotPassword from "../pages/auth/forgotPass";
import LoginAdmin from "../pages/admin/login_admin"; // Import trang login admin
import Header from "../components/header";
import Product from "../pages/screen/product";
import Orders from "../pages/payments/orders";
import AppFooter from "../components/footer";


const RoutesConfig = () => (
  <Routes>
    <Route path="/" element={<><Header /><Home /><AppFooter /></>} />
    <Route path="/store" element={<><Header /><Store /><AppFooter /></>} />
    <Route path="/product/:id" element={<><Header /><Product /><AppFooter /></>} />
    <Route path="/news" element={<><Header /><News /><AppFooter /></>} />
    <Route path="/discount" element={<><Header /><Discount /><AppFooter /></>} />
    <Route path="/introduce" element={<><Header /><Introduce /><AppFooter /></>} />

    {/* Auth routes */}
    <Route path="/login" element={<><Header /><Login /></>} />
    <Route path="/register" element={<><Header /><Register /></>} />
    <Route path="/forgot-password" element={<><Header /><ForgotPassword /></>} />

    {/* Chỉ truy cập được khi đăng nhập */}
    <Route path="/cart" element={<ProtectedRoute><Header /><Cart /><AppFooter /></ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute><Header /><Profile /><AppFooter /></ProtectedRoute>} />
    <Route path="/mess" element={<ProtectedRoute><Header /><Messenger /><AppFooter /></ProtectedRoute>} />

    {/* Payment routes */}
    <Route path="/payments/orders" element={<ProtectedRoute><Header /><Orders /><AppFooter /></ProtectedRoute>} />
    {/* <Route path="/payment/success" element={<ProtectedRoute><Header /><PaymentSuccess /></ProtectedRoute>} />
    <Route path="/payment/cancel" element={<ProtectedRoute><Header /><PaymentCancel /></ProtectedRoute>} /> */}

    {/* Admin routes */}
    <Route path="/admin/login" element={<LoginAdmin />} />
    <Route path="/admin/*" element={<ProtectedRoute isAdmin><Admin /></ProtectedRoute>} />
  </Routes>
);

export default RoutesConfig;
