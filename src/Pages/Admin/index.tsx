import { useMediaQuery } from "react-responsive";
import { Sidebar } from "../../components/Sidebar";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Home } from "../Home";
import { Dashboard } from "../Dashboard";
import { Orders } from "../Orders";
import { Products } from "../Products";
import { Customers } from "../Customers";
import { AddCustomer } from "../Customers/AddCustomer";
import { Profile } from "../Customers/Profile";
import { AddProduct } from "../Products/AddProduct";
import { useAxiosConnection } from "../../utils/AxiosConnection";
import { BsServer } from "react-icons/bs";
import { OrderDetail } from "../Orders/OrderDetail";
import { ProductDetail } from "../Products/ProductDetail";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Title } from "../../utils/Title";
import { Loading } from "../../components/Loading";

export function Admin() {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const { isConnected, isLoading } = useAxiosConnection();

  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function validateJWT() {
      if (!token) {
        if(!localStorage.getItem("authToken")) {
          await navigate("/login");
        }
      } else {
        setLoading(false);
      }
    }
    validateJWT();
  }, [navigate, token]);

  Title({ title: "Marvie" });

  const sidebarWidth = isDesktop ? "280px" : "80px";
  

  if (isLoading || loading) {
    return <Loading />;
  }

  return (
    <div className="d-flex">
      <Sidebar />
      <div
        className="p-4 w-100"
        style={{
          marginLeft: sidebarWidth,
          background: "#f7f7f8",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        {isConnected ? (
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:orderId" element={<OrderDetail />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:productId" element={<ProductDetail />} />
            <Route path="products/new" element={<AddProduct />} />
            <Route path="customers" element={<Customers />} />
            <Route path="customers/:userId" element={<Profile />} />
            <Route path="customers/new" element={<AddCustomer />} />
            <Route path="/" element={<Navigate to="home" replace />} />
          </Routes>
        ) : (
          <div className="d-flex flex-column justify-content-center align-items-center h-100">
            <BsServer color="#2A3C44" size={50} />
            <span className="text-secondary mt-3 fs-5 text-center">
              Não foi possível conectar ao servidor no momento
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
