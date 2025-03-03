import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/authContext";

const ProtectedRoute = ({ children, isAdmin = false }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const isAdminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';

  // Nếu đang ở route admin
  if (isAdmin) {
    if (!isAdminLoggedIn) {
      return <Navigate to="/admin/login" />;
    }
  } else {
    // Nếu là route user thường và chưa đăng nhập, chuyển đến trang login
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }
  }

  return children;
};

export default ProtectedRoute;
