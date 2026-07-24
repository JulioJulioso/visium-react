import { useState } from "react";
import { NavLink } from "react-router-dom";
import eyeLogo from "../../assets/logo-eye.svg";
import "./Menu.css";

const navigationItems = [
  { to: "/dashboard", icon: "bi-grid", label: "Panel de control" },
  { to: "/gestionPacientes", icon: "bi-people-fill", label: "Pacientes" },
  { to: "/citas", icon: "bi-calendar-event", label: "Citas" },
  // Métricas reutiliza temporalmente el dashboard, por lo que no debe duplicar su estado activo.
  { to: "/dashboard", icon: "bi-graph-up", label: "Métricas", matchActive: false },
  { to: "/paciente", icon: "bi-file-earmark-text", label: "Ficha" },
];

export default function MenuLateral() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((open) => !open);
  const closeMenu = () => setIsOpen(false);
  const navigationClassName = (matchActive) => ({ isActive }) =>
    `nav-link${isActive && matchActive ? " active" : ""}`;

  return (
    <aside className={`sidebar ${isOpen ? "is-open" : ""}`}>
      <div className="logo">

        <button
          className="sidebar-toggle"
          type="button"
          onClick={toggleMenu}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
        >
          <i className="bi bi-list sidebar-toggle-menu-icon" aria-hidden="true"></i>
          <img
            className="sidebar-toggle-logo"
            src={eyeLogo}
            alt=""
            aria-hidden="true"
          />
        </button>

        <div className="logo-icon">
          <img src={eyeLogo} alt="" aria-hidden="true" />
        </div>
        <div>
          <h2>Visium</h2>
          <span>Software de Gestión Óptica</span>
        </div>


      </div>

      <nav className="menu">
        {navigationItems.map(({ to, icon, label, matchActive = true }) => (
          <NavLink
            key={label}
            to={to}
            className={navigationClassName(matchActive)}
            onClick={closeMenu}
          >
            <i className={`bi ${icon}`}></i>
            <span className="nav-label">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <NavLink className={navigationClassName(true)} to="/login" onClick={closeMenu}>
          <i className="bi bi-box-arrow-right"></i>
          <span className="nav-label">Cerrar Sesión</span>
        </NavLink>
      </div>
    </aside>
  );
}
