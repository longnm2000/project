import { Route, Routes } from "react-router-dom";
import Home from "./pages/user/home/Home";
import Login from "./pages/user/login/Login";
import Register from "./pages/user/register/Register";
import NotFound from "./pages/user/NotFound/NotFound";
function App() {
  return (
    <div>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
