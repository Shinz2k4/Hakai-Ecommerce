import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const userData = localStorage.getItem("userData");
    if (token && userData) {
      // Verify token validity
      axios.get("http://localhost:5000/api/auth/verify", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        const user = JSON.parse(userData);
        setIsLoggedIn(true);
        setCurrentUser({
          id: user.user.id,
          username: user.user.username,
          email: user.user.email,
          firstName: user.user.firstName,
          lastName: user.user.lastName,
          dateOfBirth: user.user.dateOfBirth,
          gender: user.user.gender,
          token: token
        });
      })
      .catch(() => {
        // Token is invalid or expired
        logout();
      });
    }
  }, []);

  const login = (userData) => {
    setIsLoggedIn(true);
    setCurrentUser({
      id: userData.user.id,
      username: userData.user.username,
      email: userData.user.email,
      firstName: userData.user.firstName,
      lastName: userData.user.lastName,
      dateOfBirth: userData.user.dateOfBirth,
      gender: userData.user.gender,
      token: userData.token
    });
    localStorage.setItem("userToken", userData.token);
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
  };

  // Add axios interceptor to handle token expiration
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
