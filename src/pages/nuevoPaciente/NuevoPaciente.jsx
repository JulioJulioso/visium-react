import  { useState } from 'react';
import './NuevoPaciente.css';
import { Link } from 'react-router';

export default function NuevoPaciente() {
  // ===============================
  // ESTADOS DEL FORMULARIO
  // ===============================
  const [formData, setFormData] = useState({
    nombre: '', rut: '', fecha: '', sexo: '', telefono: '', email: '', motivo: '',
    diabetes: false, hipertension: false, glaucoma: true
  });
  
  const [alergias, setAlergias] = useState(['Penicilina', 'Latex']);
  const [alergiaInput, setAlergiaInput] = useState('');
  
  // ===============================
  // LÓGICA DE BARRA DE PROGRESO (Estado derivado)
  // ===============================
  const totalFields = 7; // nombre, rut, fecha, sexo, telefono, email, motivo
  
  const fieldsToTrack = [
    formData.nombre, formData.rut, formData.fecha, 
    formData.sexo, formData.telefono, formData.email, formData.motivo
  ];
  
  // Se calcula automáticamente en cada renderizado sin causar error de cascada
  const completedFields = fieldsToTrack.filter(val => val.trim() !== '').length;
  const progressPercentage = (completedFields / totalFields) * 100;

  // ===============================
  // MANEJADORES DE EVENTOS
  // ===============================
  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAlergiaKeyDown = (e) => {
    if (e.key === 'Enter' && alergiaInput.trim() !== '') {
      e.preventDefault();
      setAlergias([...alergias, alergiaInput.trim()]);
      setAlergiaInput('');
    }
  };

  const removeAlergia = (indexToRemove) => {
    setAlergias(alergias.filter((_, index) => index !== indexToRemove));
  };

  return (
    <>
      {/* Contenido Principal */}
      <div className="page-body">
          <div className="form-column">
            
            <section className="form-section">
              <h2>Datos Personales</h2>
              <div className="form-grid">
                <label>Nombre completo
                  <input type="text" id="nombre" value={formData.nombre} onChange={handleInputChange} placeholder="Ej: Juan Pérez González" />
                </label>
                <label>RUT
                  <input type="text" id="rut" value={formData.rut} onChange={handleInputChange} placeholder="12.345.678-9" />
                </label>
                <label>Fecha nacimiento
                  <input type="text" id="fecha" value={formData.fecha} onChange={handleInputChange} placeholder="mm/dd/yyyy" />
                </label>
                <label>Sexo biológico
                  <select id="sexo" value={formData.sexo} onChange={handleInputChange}>
                    <option value="">Seleccionar...</option>
                    <option value="femenino">Femenino</option>
                    <option value="masculino">Masculino</option>
                    <option value="no-contestar">Prefiero no contestar</option>
                  </select>
                </label>
                <label>Teléfono
                  <input type="text" id="telefono" value={formData.telefono} onChange={handleInputChange} placeholder="+56 9 1234 5678" />
                </label>
                <label>Email
                  <input type="email" id="email" value={formData.email} onChange={handleInputChange} placeholder="paciente@ejemplo.com" />
                </label>
              </div>
            </section>

            <section className="form-section">
              <h2>Antecedentes</h2>
              <p className="field-label">Alergias conocidas</p>
              <div className="tags" id="tags">
                {alergias.map((alergia, index) => (
                  <span key={index} className="tag" onClick={() => removeAlergia(index)}>
                    {alergia} &times;
                  </span>
                ))}
              </div>
              <input 
                type="text" 
                id="alergia-input" 
                value={alergiaInput}
                onChange={(e) => setAlergiaInput(e.target.value)}
                onKeyDown={handleAlergiaKeyDown}
                placeholder="Agregar alergia... (Enter para guardar)" 
              />
              
              <p className="field-label">Condiciones médicas</p>
              <div className="checks">
                <label>
                  <input type="checkbox" id="diabetes" checked={formData.diabetes} onChange={handleInputChange} /> Diabetes
                </label>
                <label>
                  <input type="checkbox" id="hipertension" checked={formData.hipertension} onChange={handleInputChange} /> Hipertensión
                </label>
                <label>
                  <input type="checkbox" id="glaucoma" checked={formData.glaucoma} onChange={handleInputChange} /> Glaucoma
                </label>
              </div>
            </section>

            <section className="form-section">
              <h2>Motivo de Consulta</h2>
              <textarea 
                id="motivo" 
                maxLength="500" 
                value={formData.motivo}
                onChange={handleInputChange}
                placeholder="Describa el motivo principal de la consulta del paciente..."
              ></textarea>
              <p className="hint">Máximo 500 caracteres</p>
            </section>

            <footer className="action-bar">
              <p className="required-note">* Campos obligatorios</p>
              <div className="action-buttons">
                <Link to="/recetas">
                  <button type="button" className="btn-secundario">Crear Ficha</button>
               </Link>
              </div>
            </footer>
          </div>

          <aside className="panel-lateral">
            <div className="side-card">
              <div className="card-head">
                <h3>Resumen de Ingreso</h3>
                <span className="badge">EN PROGRESO</span>
              </div>
              <div className="progress-track">
                <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
              </div>
              <p className="progress-text">{completedFields} de {totalFields} campos completados</p>
            </div>
            
            <div className="side-card">
              <h3>Últimos Pacientes</h3>
              <p className="patient-item"><strong>Beatriz Mendoza</strong><br/>12.456.789-0</p>
              <p className="patient-item"><strong>Carlos Ruiz</strong><br/>10.234.567-8</p>
            </div>
            
            <div className="side-card side-card-blue">
              <h3>Validación Automática</h3>
              <p>El RUT se validará automáticamente al ingresarlo. Verifique el dígito verificador antes de continuar.</p>
            </div>
          </aside>
        </div>
        </>
  );
}