import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import MainLayout from "../layout/MainLayout";
import HomeLayout from "../layout/HomeLayout";
import Home from "../pages/Home/Home";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout/>}>
          <Route path="/home" element={<Home />} />
        </Route>

        <Route element={<MainLayout/>}>
          <Route path="/dashboard" element={<Dashboard />} />
        
        </Route>
                
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}