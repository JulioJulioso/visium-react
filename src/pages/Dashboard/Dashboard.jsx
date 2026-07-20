import "./Dashboard.css"

const Dashboard = () => {
  return (
    <main className="main-content">
      <section className="Saludo">
        <div className="SaludoDoctor">
          <h1>Nombre de la Optica/Rol</h1>
          <p>
            <i className="fa-solid fa-calendar" /> Jueves, 24 de Octubre • <strong>4 citas pendientes</strong> hoy
          </p>
        </div>
      </section>

      <div className="grid-row-2">
        <div className="card-paciente">
          <div className="card-header">
            <div className="avatar-contenedor">
              <img src="./assets/img/retrato.svg" alt="Maria González" className="avatar-foto" />
            </div>
            <div className="info-detalles">
              <h2 className="paciente-nombre">Maria González</h2>
              <p className="consulta-tipo">
                Consulta postoperatoria
                <br />
                <span className="consulta-subtext">(Catarata)</span>
              </p>
            </div>
            <div className="etiquetas-grupo">
              <span className="badge badge-proxima">PRÓXIMA CITA</span>
              <span className="badge badge-nuevo">PACIENTE NUEVO</span>
            </div>
          </div>

          <div className="card-meta">
            <div className="meta-item horario">
              <svg
                className="icono"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>10:30 AM</span>
            </div>
            <div className="meta-item ubicacion">
              <svg
                className="icono"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Consultorio 2</span>
            </div>
          </div>

          <div className="card-acciones">
            <button className="btn-iniciar" id="btnIniciarExamen" type="button">
              <svg
                className="icono-btn"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
              Iniciar Examen
            </button>
            <button className="btn-opciones" aria-label="Más opciones" type="button">
              •••
            </button>
          </div>
        </div>

        <div className="agenda-container">
          <div className="agenda-header">
            <h3 className="agenda-titulo">Agenda Diaria</h3>
            <a href="#" className="link-calendario">Ver Calendario Completo</a>
          </div>

          <table className="tabla-agenda">
            <thead>
              <tr>
                <th>HORA</th>
                <th>PACIENTE</th>
                <th>MOTIVO DE CONSULTA</th>
                <th>ESTADO</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="col-hora">09:00</td>
                <td className="col-paciente">Carlos Rodriguez</td>
                <td className="col-motivo">Examen de Fondo de Ojo</td>
                <td>
                  <span className="badge-status status-completado">COMPLETADO</span>
                </td>
              </tr>
              <tr id="fila-maria-agenda">
                <td className="col-hora">10:30</td>
                <td className="col-paciente">Maria González</td>
                <td className="col-motivo">Post-op Catarata</td>
                <td>
                  <span className="badge-status status-siguiente" id="status-maria-badge">SIGUIENTE</span>
                </td>
              </tr>
              <tr>
                <td className="col-hora">11:45</td>
                <td className="col-paciente">Ana Silva</td>
                <td className="col-motivo">Refracción Visual</td>
                <td>
                  <span className="badge-status status-espera">EN ESPERA</span>
                </td>
              </tr>
              <tr>
                <td className="col-hora">14:00</td>
                <td className="col-paciente">Roberto</td>
                <td className="col-motivo">Consulta de Ojo</td>
                <td>
                  <span className="badge-status status-programado">PROGRAMADO</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
