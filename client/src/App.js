import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/user/home/Home";
import Login from "./pages/user/login/Login";
import Register from "./pages/user/register/Register";
import NotFound from "./pages/user/NotFound/NotFound";
import Detail from "./pages/user/detail/Detail";
import Cart from "./pages/user/cart/Cart";
import AdminLogin from "./pages/admin/AdminLogin/AdminLogin";
import UsersManager from "./pages/admin/UsersManager/UsersManager";
function App() {
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    scrollToTop();
  }, [navigate]);
  return (
    <div>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/laptop/:id" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/users" element={<UsersManager />} />
      </Routes>
    </div>
  );
}

export default App;
