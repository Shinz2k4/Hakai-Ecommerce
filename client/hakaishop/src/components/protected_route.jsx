import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/authContext";

const ProtectedRoute = ({ children, isAdmin = false }) => {
  const { isLoggedIn, currentUser } = useContext(AuthContext);
  const isAdminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';

  // Nếu đang ở route admin
  if (isAdmin) {
    // Nếu chưa đăng nhập, chuyển đến trang login admin
    if (!isLoggedIn) {
      return <Navigate to="/admin/login" />;
    }
  }

  return children;
};

export default ProtectedRoute;
