import { useGestionPacientes } from './useGestionPacientes';
import './gestionPacientes.css';

export default function GestionPacientes() {
  // Extraemos toda la lógica y estados de nuestro Custom Hook
  const {
    patients, searchQuery, setSearchQuery, currentPage, setCurrentPage,
    filterTab, setFilterTab, isModalOpen, setIsModalOpen, formData, setFormData,
    contextMenu, editingIndex, filteredPatients, currentPatients, totalPages,
    startRecord, endRecord, handleOpenModal, handleFormSubmit, handleDeletePatient, handleContextMenu
  } = useGestionPacientes();

  return (
    <main className="main">
      {/* Barra superior */}
      <header className="topbar">
        <div className="topbar-left">
          <button className="back-btn"><i className="fa-solid fa-arrow-left"></i></button>
          <h3>Pacientes</h3>
        </div>
        <div className="topbar-center">
          <div className="search-box">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Buscar paciente o ID..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
        <div className="topbar-right">
          <button className="btn-primary" onClick={() => handleOpenModal(-1)}>
            <i className="fa-solid fa-user-plus"></i> Nuevo Paciente
          </button>
          <button className="icon-btn"><i className="fa-regular fa-bell"></i></button>
          <div className="profile">
            <img src="https://i.pravatar.cc/100?img=12" alt="Doctor" />
            <span>Dr. Smith</span>
          </div>
        </div>
      </header>

      {/* Dashboard */}
      <section className="dashboard">
        <div className="dashboard-header">
          <div>
            <h1>Gestión de Pacientes</h1>
            <p>Viendo la base de datos central de oftalmología.</p>
          </div>
          <button className="add-patient" onClick={() => handleOpenModal(-1)}>
            <i className="fa-solid fa-plus"></i> Agregar Paciente
          </button>
        </div>

        <div className="cards">
          <div className="card">
            <div className="card-icon blue"><i className="fa-solid fa-users"></i></div>
            <div className="card-info">
              <span>Total Pacientes</span>
              <h2>{patients.length}</h2>
            </div>
          </div>
          <div className="card">
            <div className="card-icon green"><i className="fa-regular fa-calendar-check"></i></div>
            <div className="card-info">
              <span>Citas Hoy</span>
              <h2>24</h2>
            </div>
          </div>
          <div className="card">
            <div className="card-icon orange"><i className="fa-solid fa-stethoscope"></i></div>
            <div className="card-info">
              <span>Procedimientos</span>
              <h2>12</h2>
            </div>
          </div>
        </div>

        {/* 👇 AQUÍ ESTÁ EL CAMBIO: div contenedor de la tabla 👇 */}
        <div className="patients-container">
          <div className="patients-header">
            <div>
              <div className="patients-title">
                <h2>Pacientes</h2>
                <span>{filteredPatients.length} registros</span>
              </div>
              <div className="patient-tabs">
                <button className={`tab ${filterTab === "all" ? "active" : ""}`} onClick={() => { setFilterTab("all"); setCurrentPage(1); }}>
                  Todos
                </button>
                <button className={`tab ${filterTab === "active" ? "active" : ""}`} onClick={() => { setFilterTab("active"); setCurrentPage(1); }}>
                  Activos
                </button>
              </div>
            </div>
            <div className="patients-actions">
              <button className="filter-btn"><i className="fa-solid fa-filter"></i> Filtrar</button>
              <button className="export-btn"><i className="fa-solid fa-file-export"></i> Exportar</button>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Paciente</th>
                <th>ID</th>
                <th>Última Consulta</th>
                <th>Condición</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr className="pagination-row" style={{ display: 'contents' }}>
                <td colSpan="5" style={{ padding: 0 }}>
                  <div className="pagination">
                    <div className="pagination-info">
                      <span>Mostrando {startRecord}-{endRecord} de {filteredPatients.length} pacientes</span>
                    </div>
                    <div className="pagination-buttons">
                      <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                        <i className="fa-solid fa-chevron-left"></i>
                      </button>
                      <span>Página {currentPage} de {totalPages}</span>
                      <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                        <i className="fa-solid fa-chevron-right"></i>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>

              {currentPatients.map((p) => {
                const globalIndex = patients.findIndex(pat => pat.id === p.id);
                return (
                  <tr key={p.id} className="fade">
                    <td className="patient">
                      <img src={p.img} alt={p.nombre} />
                      <div>
                        <strong>{p.nombre}</strong>
                        <small>{p.edad} años · {p.sexo}</small>
                      </div>
                    </td>
                    <td>{p.id}</td>
                    <td>{p.consulta}</td>
                    <td>
                      <span className={`badge ${p.color}`}>{p.condicion}</span>
                    </td>
                    <td>
                      <button className="recipe-btn" onClick={() => alert("Módulo de recetas")}>
                        Crear Receta
                      </button>
                      <button className="menu-btn action-btn" onClick={(e) => handleContextMenu(e, globalIndex)}>
                        <i className="fa-solid fa-ellipsis"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* 👆 FIN DEL CONTENEDOR 👆 */}

      </section>

      {/* Menú Contextual */}
      {contextMenu.visible && (
        <div className="context-menu show" style={{ left: contextMenu.x, top: contextMenu.y, position: 'absolute' }}>
          <button onClick={() => alert("Ficha del paciente")}><i className="fa-regular fa-eye"></i> Ver ficha</button>
          <button onClick={() => handleOpenModal(contextMenu.patientIndex)}><i className="fa-regular fa-pen-to-square"></i> Editar</button>
          <button onClick={() => alert("Módulo de recetas")}><i className="fa-solid fa-stethoscope"></i> Crear receta</button>
          <button onClick={() => handleDeletePatient(contextMenu.patientIndex)}><i className="fa-regular fa-trash-can"></i> Eliminar</button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="modal show" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingIndex >= 0 ? "Editar Paciente" : "Nuevo Paciente"}</h2>
              <button onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label>Nombre</label>
                <input type="text" required value={formData.nombre} onChange={e => setFormData({ ...formData, nombre: e.target.value })} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Edad</label>
                  <input type="number" required value={formData.edad} onChange={e => setFormData({ ...formData, edad: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Sexo</label>
                  <select value={formData.sexo} onChange={e => setFormData({ ...formData, sexo: e.target.value })}>
                    <option>Femenino</option>
                    <option>Masculino</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>ID</label>
                <input type="text" required value={formData.id} onChange={e => setFormData({ ...formData, id: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Última consulta</label>
                <input type="date" value={formData.consulta} onChange={e => setFormData({ ...formData, consulta: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Condición</label>
                <input type="text" value={formData.condicion} onChange={e => setFormData({ ...formData, condicion: e.target.value })} />
              </div>
              <div className="modal-footer">
                <button type="submit" className="save-btn">Guardar Paciente</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}