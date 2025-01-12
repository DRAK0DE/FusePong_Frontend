import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function CreateUserStory() {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [descriptions, setDescriptions] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState('');
  const [ticketTitle, setTicketTitle] = useState('');

  // Obtener proyectos al cargar el componente
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await api.get('/projects');
      setProjects(response.data);
    };
    fetchProjects();
  }, []);

  // Actualizar descripciones al seleccionar un proyecto
  const handleProjectChange = (e) => {
    const projectId = e.target.value;
    setSelectedProjectId(projectId);
    const project = projects.find((p) => p._id === projectId);
    setDescriptions(project ? project.descriptions : []);
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    if (!selectedProjectId || !selectedDescription || !ticketTitle) {
      alert('Por favor completa todos los campos');
      return;
    }
    try {
      await api.post('/tickets', {
        projectId: selectedProjectId,
        description: selectedDescription,
        title: ticketTitle,
        status: 'Activo',
      });
      alert('Ticket creado con éxito');
      setSelectedProjectId('');
      setSelectedDescription('');
      setTicketTitle('');
    } catch (error) {
      console.error('Error al crear ticket:', error);
      alert('Error al crear ticket');
    }
  };

  return (
    <div style={{ margin: '2rem' }}>
      <h2>Crear Ticket</h2>
      <form onSubmit={handleCreateTicket}>
        <div>
          <label>Proyecto</label>
          <br />
          <select
            value={selectedProjectId}
            onChange={handleProjectChange}
            required
          >
            <option value="">-- Seleccionar Proyecto --</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label>Descripción del Proyecto</label>
          <br />
          <select
            value={selectedDescription}
            onChange={(e) => setSelectedDescription(e.target.value)}
            required
            disabled={!descriptions.length}
          >
            <option value="">-- Seleccionar Descripción --</option>
            {descriptions.map((description, index) => (
              <option key={index} value={description}>
                {description}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label>Título del Ticket</label>
          <br />
          <input
            type="text"
            value={ticketTitle}
            onChange={(e) => setTicketTitle(e.target.value)}
            placeholder="Título del ticket"
            required
          />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Crear Ticket</button>
      </form>
    </div>
  );
}

export default CreateUserStory;
