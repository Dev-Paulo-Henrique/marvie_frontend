import { useMediaQuery } from "react-responsive";
import { Sidebar } from "../../components/Sidebar";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAxiosConnection } from "../../utils/AxiosConnection";
import { BsServer } from "react-icons/bs";
import { OrderDetail } from "../Orders/OrderDetail";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Title } from "../../utils/Title";
import { Loading } from "../../components/Loading";
import { Order } from "./Order";

export function My() {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const { isConnected, isLoading } = useAxiosConnection();

  const [loading, setLoading] = useState(true);
  const { token, userName } = useAuth();
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

  Title({ title: userName ? userName : "Marvie" });

  if (isLoading || loading) {
    return <Loading />;
  }

  return (
    <div className="d-flex">
      <Sidebar />
      <div
        className="p-4 w-100"
        style={{
          marginLeft: isDesktop ? "280px" : "0",
          background: "#f7f7f8",
          height: "100vh",
          overflowY: "auto",
          marginTop: isDesktop ? "0" : "80px"
        }}
      >
        {isConnected ? (
          <Routes>
            <Route path="orders" element={<Order />} />
            <Route path="orders/:orderId" element={<OrderDetail />} />
            <Route path="/" element={<Navigate to="orders" replace />} />
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
