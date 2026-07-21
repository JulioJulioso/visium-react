import "./HeaderMenu.css";

export default function HeaderMenu (){
    return(
        <header classNameName="topbar">
          <button className="back-button" type="button">
            <img src="assets/img/arrow.svg" alt="Flecha" aria-hidden="true" />
            <span>Citas</span>
          </button>

          <form className="search-box" role="search">
            <img src="assets/img/search.svg" alt="buscar" aria-hidden="true" />
            <input
              type="search"
              name="buscar"
              placeholder="Buscar paciente o rut..."
            />
          </form>

          <div className="topbar-actions">
            <button className="btn btn-primary btn-sm" type="button">
              <img
                src="assets/img/nuevo-paciente.svg"
                alt="nuevo paciente"
                aria-hidden="true"
              />
              <span>Nuevo Paciente</span>
            </button>

            <span className="separator" aria-hidden="true"></span>

            <button
              className="icon-button"
              type="button"
              aria-label="Notificaciones"
            >
              <img
                src="assets/img/campanita.svg"
                alt="notificaciones"
                aria-hidden="true"
              />
            </button>

            <div className="profile">
              <img src="assets/img/doctor.svg" alt="Foto del doctor" />
              <span>Dr. Smith</span>
            </div>
          </div>
        </header>
    )
}