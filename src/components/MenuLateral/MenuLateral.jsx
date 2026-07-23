import { useState } from "react";
import { Link } from "react-router";
import "./Menu.css";

export default function MenuLateral() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <aside className={`sidebar ${isOpen ? "is-open" : ""}`}>
      <div className="logo">
        <div className="logo-icon">
          {/* 🔴 Corregido: className en vez de class */}
          <i className="fa-solid fa-eye"></i>
        </div>
        <div>
          <h2>Visium</h2>
          <span>Software de Gestión Óptica</span>
        </div>

        <button
          className="sidebar-toggle"
          type="button"
          onClick={toggleMenu}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
        >
          {/* 🔴 Corregido: className en vez de class */}
          <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"}`}></i>
        </button>
      </div>

      <nav className="menu">
        <Link className="nav-link active" aria-current="page" to="/" onClick={closeMenu}>
          {/* 🔴 Corregido: className */}
          <i className="bi bi-grid fw-bold"></i>
          Panel de control
        </Link>
        <Link className="nav-link" to="/" onClick={closeMenu}>
          {/* 🔴 Corregido: className */}
          <i className="bi bi-people-fill"></i>
          Pacientes
        </Link>
        <Link className="nav-link" to="/" onClick={closeMenu}>
          {/* 🔴 Corregido: className */}
          <i className="bi bi-calendar-event"></i>
          Citas
        </Link>
        <Link className="nav-link" to="/" onClick={closeMenu}>
          {/* 🔴 Corregido: className */}
          <i className="bi bi-graph-up"></i>
          Métricas
        </Link>
        <Link className="nav-link" to="/" onClick={closeMenu}>
          {/* 🔴 Corregido: className */}
          <i className="bi bi-file-earmark-text"></i>
          Ficha
        </Link>
      </nav>

      <div className="sidebar-bottom">
        <Link className="nav-link" to="/" onClick={closeMenu}>
          {/* 🔴 Corregido: className */}
          <i className="bi bi-box-arrow-right"></i>
          Cerrar Sesión
        </Link>
      </div>
    </aside>
  );
}