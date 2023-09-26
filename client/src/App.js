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
import OrdersManager from "./pages/admin/OrderManager/OrderManager";
import LaptopsManager from "./pages/admin/LaptopsManager/LaptopsManager";
import AddProduct from "./pages/admin/AddProduct/AddProduct";
import BranchesManager from "./pages/admin/BranchesManager/BranchesManager";
import UpdateBranch from "./pages/admin/UpdateBranch/UpdateBranch";
import UpdateProduct from "./pages/admin/UpdateProduct/UpdateProduct";
import PrivateAdminRoutes from "./components/PrivateAdminRoutes/PrivateAdminRoutes";
import OrderHistory from "./pages/user/OrderHistory/OrderHistory";

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
        <Route path="/history" element={<OrderHistory />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<PrivateAdminRoutes />}>
          <Route path="/admin/users" element={<UsersManager />} />
          <Route path="/admin/orders" element={<OrdersManager />} />
          <Route path="/admin/laptops" element={<LaptopsManager />} />
          <Route path="/admin/laptops/add" element={<AddProduct />} />
          <Route path="/admin/laptops/:id/update" element={<UpdateProduct />} />
          <Route path="/admin/manufacturers" element={<BranchesManager />} />
          <Route
            path="/admin/manufacturers/:id/update"
            element={<UpdateBranch />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
