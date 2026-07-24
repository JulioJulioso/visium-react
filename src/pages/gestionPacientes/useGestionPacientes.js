import { useState, useEffect } from 'react';

// Datos iniciales
const initialPatients = [
  { nombre: "María González", edad: 34, fechaNacimiento: "1992-03-18", sexo: "Femenino", id: "P-1001", telefono: "+56 9 1234 5678", email: "maria.gonzalez@example.com", consulta: "20/06/2026", condicion: "Glaucoma Avanzado", color: "red", img: "https://i.pravatar.cc/150?img=1" },
  { nombre: "Carlos Soto", edad: 51, fechaNacimiento: "1975-05-09", sexo: "Masculino", id: "P-1002", telefono: "+56 9 2345 6789", email: "carlos.soto@example.com", consulta: "19/06/2026", condicion: "Control Post-Op", color: "green", img: "https://i.pravatar.cc/150?img=2" },
  { nombre: "Andrea Pérez", edad: 18, fechaNacimiento: "2008-01-27", sexo: "Femenino", id: "P-1003", telefono: "+56 9 3456 7890", email: "andrea.perez@example.com", consulta: "17/06/2026", condicion: "Miopía Progresiva", color: "blue", img: "https://i.pravatar.cc/150?img=3" },
  { nombre: "José Ramírez", edad: 67, fechaNacimiento: "1959-02-11", sexo: "Masculino", id: "P-1004", telefono: "+56 9 4567 8901", email: "jose.ramirez@example.com", consulta: "16/06/2026", condicion: "Cataratas (OD)", color: "orange", img: "https://i.pravatar.cc/150?img=4" }
];

const PATIENTS_STORAGE_KEY = "visium.gestion-pacientes";
const emptyPersonalData = {
  nombre: "",
  id: "",
  fechaNacimiento: "",
  sexo: "Femenino",
  telefono: "",
  email: ""
};

function calculateAge(fechaNacimiento, fallbackAge = "") {
  if (!fechaNacimiento) return fallbackAge;

  const birthDate = new Date(`${fechaNacimiento}T00:00:00`);
  if (Number.isNaN(birthDate.getTime())) return fallbackAge;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const birthdayPending =
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate());

  if (birthdayPending) age -= 1;
  return age;
}

function normalizePatient(patient) {
  return {
    ...patient,
    fechaNacimiento: patient.fechaNacimiento ?? "",
    telefono: patient.telefono ?? "",
    email: patient.email ?? ""
  };
}

function getInitialPatients() {
  try {
    const storedPatients = localStorage.getItem(PATIENTS_STORAGE_KEY);

    if (!storedPatients) {
      return initialPatients;
    }

    const parsedPatients = JSON.parse(storedPatients);
    return Array.isArray(parsedPatients) && parsedPatients.length > 0
      ? parsedPatients.map(normalizePatient)
      : initialPatients;
  } catch (error) {
    console.error("Error leyendo localStorage", error);
    return initialPatients;
  }
}

export function useGestionPacientes() {
  const [patients, setPatients] = useState(getInitialPatients);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterTab, setFilterTab] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [formData, setFormData] = useState(emptyPersonalData);

  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, patientIndex: -1 });
  const rowsPerPage = 3;

  // Guardar en LocalStorage cada vez que cambien los pacientes
  useEffect(() => {
    localStorage.setItem(PATIENTS_STORAGE_KEY, JSON.stringify(patients));
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
      setFormData({
        nombre: p.nombre,
        id: p.id,
        fechaNacimiento: p.fechaNacimiento ?? "",
        sexo: p.sexo,
        telefono: p.telefono ?? "",
        email: p.email ?? ""
      });
    } else {
      setFormData(emptyPersonalData);
    }
    setContextMenu(current => ({ ...current, visible: false }));
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let updatedPatients = [...patients];
    if (editingIndex === -1) {
      updatedPatients.push({
        ...formData,
        edad: calculateAge(formData.fechaNacimiento),
        consulta: "",
        condicion: "Sin diagnóstico",
        color: "blue",
        img: `https://i.pravatar.cc/150?u=${Date.now()}`
      });
    } else {
      updatedPatients[editingIndex] = {
        ...patients[editingIndex],
        ...formData,
        edad: calculateAge(formData.fechaNacimiento, patients[editingIndex].edad)
      };
    }

    setPatients(updatedPatients);
    setIsModalOpen(false);
    setFormData(emptyPersonalData);
  };

  const handleDeletePatient = (index) => {
    if (window.confirm("¿Desea eliminar este paciente?")) {
      const updatedPatients = patients.filter((_, i) => i !== index);
      setPatients(updatedPatients);
    }
  };

  const handleContextMenu = (e, index) => {
    e.stopPropagation();

    const buttonRect = e.currentTarget.getBoundingClientRect();
    const menuWidth = 250;
    const menuHeight = 224;
    const viewportPadding = 12;
    const gap = 8;

    const preferredX = buttonRect.right - menuWidth;
    const x = Math.min(
      Math.max(preferredX, viewportPadding),
      window.innerWidth - menuWidth - viewportPadding
    );

    const spaceBelow = window.innerHeight - buttonRect.bottom;
    const preferredY = spaceBelow >= menuHeight + gap
      ? buttonRect.bottom + gap
      : buttonRect.top - menuHeight - gap;
    const y = Math.min(
      Math.max(preferredY, viewportPadding),
      window.innerHeight - menuHeight - viewportPadding
    );

    setContextMenu(current => {
      if (current.visible && current.patientIndex === index) {
        return { ...current, visible: false };
      }

      return { visible: true, x, y, patientIndex: index };
    });
  };

  // Retornamos todo lo que la interfaz (JSX) va a necesitar
  return {
    patients, searchQuery, setSearchQuery, currentPage, setCurrentPage,
    filterTab, setFilterTab, isModalOpen, setIsModalOpen, formData, setFormData,
    contextMenu, editingIndex, filteredPatients, currentPatients, totalPages,
    startRecord, endRecord, handleOpenModal, handleFormSubmit, handleDeletePatient, handleContextMenu
  };
}
