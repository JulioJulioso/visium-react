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
                 <Link className="nav-link active" aria-current="page" to="/">Panel de control</Link> 
                <Link className="nav-link active" aria-current="page" to="/">Pacientes</Link>
                <Link className="nav-link active" aria-current="page" to="/">Citas</Link>
                <Link className="nav-link active" aria-current="page" to="/">Metrica</Link>
                <Link className="nav-link active" aria-current="page" to="/">Ficha</Link>
            </nav>
            <div className="sidebar-bottom">
                <Link className="nav-link active" aria-current="page" to="/">Cerrar Sesion</Link>
            </div>
        </aside>
   );
 }
