import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Recetas from "../pages/Recetas/Recetas";
import MainLayout from "../layout/MainLayout";
import HomeLayout from "../layout/HomeLayout";
import Home from "../pages/Home/Home";
import NuevoPaciente from "../pages/nuevoPaciente/NuevoPaciente";
import Citas from "../pages/Citas/GestionCitas";
import GestionCitas from "../pages/Citas/GestionCitas";
import GestionPaciente from "../pages/gestion-paciente/GestionPaciente";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/paciente" element={<NuevoPaciente />} />
          <Route path="/gestion" element={<GestionPaciente />} />
          <Route path="/recetas" element={<Recetas />} />
          <Route path="/citas" element={<GestionCitas />} />

        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />



      </Routes>


    </BrowserRouter>
  );
}