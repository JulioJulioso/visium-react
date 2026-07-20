import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Menulateral from "../components/layout/MenuLateral";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Footer from "../components/Footer/Footer";
import Dashboard from "../pages/Dashboard/Dashboard";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/footer" element={<Footer/>} />
        <Route path="/menuLateral" element={<Menulateral />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}