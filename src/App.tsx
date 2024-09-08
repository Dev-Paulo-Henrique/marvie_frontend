// import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Main } from "./Pages";
import { Admin } from "./Pages/Admin";
import { Toaster } from "react-hot-toast";
import { Login } from "./Pages/Auth/Login";
import { useAuth } from "./hooks/useAuth";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ForgotPassword } from "./Pages/Auth/ForgotPassword";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./scss/styles.scss";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Checkout } from "./Pages/Checkout";
import { ResetPassword } from "./Pages/Auth/ResetPassword";
import { ViewProduct } from "./Pages/Products/ViewProduct";
import { Busca } from "./Pages/Busca";
import { CartProvider } from "./contexts/CartContext";
import { Cart } from "./components/Cart";

const AppRoutes = () => {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/busca/:search" element={<Busca />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/reset_password/:token" element={<ResetPassword />} />
      <Route path="/view/:productId" element={<ViewProduct />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route
        path="/login"
        element={!token ? <Login /> : <Navigate to="/admin/home" replace />}
      />
      <Route path="/admin/*" element={<Admin />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthContextProvider>
      <CartProvider>
        <BrowserRouter>
          <AppRoutes />
          <Toaster />
          <Cart />
          <ToastContainer />
        </BrowserRouter>
      </CartProvider>
    </AuthContextProvider>
  );
}

export default App;
