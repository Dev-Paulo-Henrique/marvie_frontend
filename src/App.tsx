// import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Main } from "./Pages";
import { Admin } from "./Pages/Admin";
import { Toaster } from "react-hot-toast";
import { Login } from "./Pages/Auth/Login";
import { useAuth } from "./hooks/useAuth";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ForgotPassword } from "./Pages/Auth/ForgotPassword";

import "./scss/styles.scss";
import { Checkout } from "./Pages/Checkout";
import { ResetPassword } from "./Pages/Auth/ResetPassword";
import { ViewProduct } from "./Pages/Products/ViewProduct";

const AppRoutes = () => {
  const { token, userName } = useAuth();
  console.log("Token in AppRoutes:", token);
  console.log("Username:", userName);

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/reset_password/:token" element={<ResetPassword />} />
      <Route path="/product/:id" element={<ViewProduct />} />
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
      <BrowserRouter>
        <AppRoutes />
        <Toaster />
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
