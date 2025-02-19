import "./CSS/App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/screen/home";
import Store from "./pages/screen/store";
import News from "./pages/screen/news";
import Discount from "./pages/screen/discount";
import Introduce from "./pages/screen/introduce";
import Header from "./components/header";
import Cart from "./pages/user_menu/cart";
import Profile from "./pages/user_menu/profile";
import Messenger from "./pages/user_menu/mess";
import Admin from "./pages/admin/admin";

function AnimatedRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  };

  if (isAdminRoute) {
    return (
      <AnimatePresence mode="wait">
        <Routes location={location}>
          <Route path="/admin/*" element={<motion.div key={location.pathname} {...pageTransition}><Admin /></motion.div>} />
        </Routes>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route path="/" element={<motion.div key={location.pathname} {...pageTransition}><Home /></motion.div>} />
        <Route path="/store" element={<motion.div key={location.pathname} {...pageTransition}><Store /></motion.div>} />
        <Route path="/news" element={<motion.div key={location.pathname} {...pageTransition}><News /></motion.div>} />
        <Route path="/discount" element={<motion.div key={location.pathname} {...pageTransition}><Discount /></motion.div>} />
        <Route path="/introduce" element={<motion.div key={location.pathname} {...pageTransition}><Introduce /></motion.div>} />
        <Route path="/cart" element={<motion.div key={location.pathname} {...pageTransition}><Cart /></motion.div>} />
        <Route path="/profile" element={<motion.div key={location.pathname} {...pageTransition}><Profile /></motion.div>} />
        <Route path="/mess" element={<motion.div key={location.pathname} {...pageTransition}><Messenger /></motion.div>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Header />}
      <AnimatedRoutes />
    </>
  );
}

export default App;
