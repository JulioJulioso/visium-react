import "./Menu.css";
import { Link } from "react-router";

export default function MenuLateral (){ 
    return ( 
        <aside className="sidebar">
            <div className="logo">
                <div className="logo-icon"><i className="fa-solid fa-eye"></i></div>
                <div>
                    <h2>Visium</h2>
                    <span>Software de Gestión Óptica</span>
                </div>
            </div>
            <button className="sidebar-toggle" type="button" aria-label="Abrir menu" aria-expanded="false">
                <i className="fa-solid fa-bars"></i>
            </button>
            <nav className="menu">
                <Link className="nav-link active" aria-current="page" to="/">
                    <i class="bi bi-grid fw-bold"></i>
                    Panel de control
                </Link> 
                <Link className="nav-link " aria-current="page" to="/">
                    <i class="bi bi-people-fill"></i>
                    Pacientes
                </Link>
                <Link className="nav-link " aria-current="page" to="/">
                    <i class="bi bi-calendar-event"></i>
                    Citas
                </Link>
                <Link className="nav-link " aria-current="page" to="/">
                    <i class="bi bi-graph-up"></i>
                    Metrica
                </Link>
                <Link className="nav-link " aria-current="page" to="/">
                    <i class="bi bi-file-earmark-text"></i>
                    Ficha
                </Link>
            </nav>
            <div className="sidebar-bottom">
                <Link className="nav-link active" aria-current="page" to="/">Cerrar Sesion</Link>
            </div>
        </aside>
   );
 }
