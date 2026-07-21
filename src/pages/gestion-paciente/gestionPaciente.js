import { useState, useEffect } from 'react';

// Datos iniciales
const initialPatients = [
  { nombre: "María González", edad: 34, sexo: "Femenino", id: "P-1001", consulta: "20/06/2026", condicion: "Glaucoma Avanzado", color: "red", img: "https://i.pravatar.cc/150?img=1" },
  { nombre: "Carlos Soto", edad: 51, sexo: "Masculino", id: "P-1002", consulta: "19/06/2026", condicion: "Control Post-Op", color: "green", img: "https://i.pravatar.cc/150?img=2" },
  { nombre: "Andrea Pérez", edad: 18, sexo: "Femenino", id: "P-1003", consulta: "17/06/2026", condicion: "Miopía Progresiva", color: "blue", img: "https://i.pravatar.cc/150?img=3" },
  { nombre: "José Ramírez", edad: 67, sexo: "Masculino", id: "P-1004", consulta: "16/06/2026", condicion: "Cataratas (OD)", color: "orange", img: "https://i.pravatar.cc/150?img=4" }
];

export function useGestionPacientes() {
  // Inicialización perezosa (Lazy Initialization) para evitar el error del linter
  const [patients, setPatients] = useState(() => {
    try {
      const data = localStorage.getItem("patients");
      return data ? JSON.parse(data) : initialPatients;
    } catch (error) {
      console.error("Error leyendo localStorage", error);
      return initialPatients;
    }
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterTab, setFilterTab] = useState("all");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [formData, setFormData] = useState({
    nombre: "", edad: "", sexo: "Femenino", id: "", consulta: "", condicion: ""
  });

  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, patientIndex: -1 });
  const rowsPerPage = 3;

  // Guardar en LocalStorage cada vez que cambien los pacientes
  useEffect(() => {
    if (patients.length > 0) {
      localStorage.setItem("patients", JSON.stringify(patients));
    }
  }, [patients]);

  // Cerrar menú contextual al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = () => setContextMenu({ ...contextMenu, visible: false });
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [contextMenu]);

  // Lógica de filtrado
  let filteredPatients = patients.filter(p => {
    const matchSearch = p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        p.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        p.condicion.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTab = filterTab === "all" ? true : p.condicion !== "Inactivo";
    return matchSearch && matchTab;
  });

  // Lógica de Paginación
  const totalPages = Math.max(1, Math.ceil(filteredPatients.length / rowsPerPage));
  const start = (currentPage - 1) * rowsPerPage;
  const currentPatients = filteredPatients.slice(start, start + rowsPerPage);
  const startRecord = filteredPatients.length === 0 ? 0 : start + 1;
  const endRecord = Math.min(start + rowsPerPage, filteredPatients.length);

  // Manejadores de eventos
  const handleOpenModal = (index = -1) => {
    setEditingIndex(index);
    if (index >= 0) {
      const p = patients[index];
      setFormData({ nombre: p.nombre, edad: p.edad, sexo: p.sexo, id: p.id, consulta: p.consulta, condicion: p.condicion });
    } else {
      setFormData({ nombre: "", edad: "", sexo: "Femenino", id: "", consulta: "", condicion: "" });
    }
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newPatient = {
      ...formData,
      color: "blue",
      img: editingIndex >= 0 ? patients[editingIndex].img : `https://i.pravatar.cc/150?u=${Date.now()}`
    };

    let updatedPatients = [...patients];
    if (editingIndex === -1) {
      updatedPatients.push(newPatient);
    } else {
      updatedPatients[editingIndex] = newPatient;
    }

    setPatients(updatedPatients);
    setIsModalOpen(false);
    setFormData({ nombre: "", edad: "", sexo: "Femenino", id: "", consulta: "", condicion: "" });
  };

  const handleDeletePatient = (index) => {
    if (window.confirm("¿Desea eliminar este paciente?")) {
      const updatedPatients = patients.filter((_, i) => i !== index);
      setPatients(updatedPatients);
    }
  };

  const handleContextMenu = (e, index) => {
    e.stopPropagation();
    setContextMenu({ visible: true, x: e.pageX, y: e.pageY, patientIndex: index });
  };

  // Retornamos todo lo que la interfaz (JSX) va a necesitar
  return {
    patients, searchQuery, setSearchQuery, currentPage, setCurrentPage,
    filterTab, setFilterTab, isModalOpen, setIsModalOpen, formData, setFormData,
    contextMenu, editingIndex, filteredPatients, currentPatients, totalPages,
    startRecord, endRecord, handleOpenModal, handleFormSubmit, handleDeletePatient, handleContextMenu
  };
}