import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/authContext";

const AdminRoute = ({ children }) => {
  const { isLoggedIn, currentUser } = useContext(AuthContext);
  const isAdminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';

  if (isAdminLoggedIn) {
    return <Navigate to="/admin/dashboard" />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" />;
  }

  if (currentUser?.role !== 'admin') {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default AdminRoute;
