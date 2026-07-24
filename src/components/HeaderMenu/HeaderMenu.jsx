import "./HeaderMenu.css";

export default function HeaderMenu() {
  return (
    <header className="topbar">
      {/* 1. Botón Volver */}
      <div className="topbar-left">
        <button className="back-btn" aria-label="Volver">
          <i className="bi bi-arrow-left"></i>
        </button>
      </div>

      {/* 2. Buscador / Input (Izquierda-Centro) */}
      <div className="topbar-center">
        <div className="search-box">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            id="searchPatient"
            placeholder="Buscar paciente o ID..."
          />
        </div>
      </div>

      {/* 3. Acciones a la Derecha (Nuevo Paciente, Campana, Perfil) */}
      <div className="topbar-right">
        <button className="btn-primary">
          <i className="bi bi-person-fill-add"></i>
          <span className="btn-text">Nuevo Paciente</span>
        </button>

        <button className="icon-btn" aria-label="Notificaciones">
          <i className="bi bi-bell"></i>
        </button>

        <div className="profile">
          <img src="https://i.pravatar.cc/100?img=12" alt="Doctor" />
          <span>Perfil</span>
        </div>
      </div>
    </header>
  );
}
