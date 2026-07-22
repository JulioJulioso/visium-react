import "./HeaderMenu.css";
import { useLocation } from "react-router";

export default function HeaderMenu (){

  const location = useLocation();
  const ocultarHeader = location.pathname === '/gestion';
  
  return(
    <header class="topbar">
      <div className="topbar-left">
        <button className="back-btn">
          <i className="bi bi-arrow-left"></i>
        </button>
      </div>

      <div className="topbar-center">
        <div className="search-box">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" id="searchPatient" placeholder="Buscar paciente o ID..." />
        </div>
      </div>

      <div className="topbar-right">
        {!ocultarHeader && 
        <button className="btn-primary">
          <i className="bi bi-person-fill-add"></i>
          Nuevo Paciente
        </button>
        }
        <button className="icon-btn">
          <i className="bi bi-bell"></i>
        </button>

        <div className="profile">
          <img src="https://i.pravatar.cc/100?img=12" alt="Doctor" />
            <span>Perfil</span>
        </div>

      </div>

    </header>
  )
}