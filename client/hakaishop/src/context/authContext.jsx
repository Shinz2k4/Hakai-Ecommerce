import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const userData = localStorage.getItem("userData");
    if (token && userData) {
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

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
