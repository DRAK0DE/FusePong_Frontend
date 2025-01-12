import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [actionType, setActionType] = useState('newProject'); // 'newProject' o 'addDescription'
  const [newProjectName, setNewProjectName] = useState('');
  const [newDescriptions, setNewDescriptions] = useState(['']);
  const [newProjectCompanyId, setNewProjectCompanyId] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [newDescriptionForProject, setNewDescriptionForProject] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await api.get('/projects');
      setProjects(response.data);
    };
    const fetchCompanies = async () => {
      const response = await api.get('/companies');
      setCompanies(response.data);
    };
    fetchProjects();
    fetchCompanies();
  }, []);

  // Función para crear un nuevo proyecto
  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await api.post('/projects', {
        name: newProjectName,
        descriptions: newDescriptions,
        companyId: newProjectCompanyId,
      });
      alert('Proyecto creado con éxito');
      resetForm();
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error al crear proyecto:', error);
      alert('Error al crear proyecto');
    }
  };

  // Función para añadir una nueva descripción a un proyecto existente
  const handleAddDescriptionToProject = async (e) => {
    e.preventDefault();
    if (!selectedProjectId || !newDescriptionForProject) {
      alert('Selecciona un proyecto y añade una descripción');
      return;
    }
    try {
      await api.put(`/projects/${selectedProjectId}`, {
        descriptions: [newDescriptionForProject],
      });
      alert('Descripción añadida con éxito');
      setNewDescriptionForProject('');
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error al añadir descripción:', error);
      alert('Error al añadir descripción');
    }
  };

  const resetForm = () => {
    setNewProjectName('');
    setNewDescriptions(['']);
    setNewProjectCompanyId('');
    setSelectedProjectId('');
    setNewDescriptionForProject('');
  };

  return (
    <div style={{ margin: '2rem' }}>
      <h2>Listado de Proyectos</h2>

      {/* Selector para acción */}
      <div style={{ marginBottom: '1rem' }}>
        <label>¿Qué deseas hacer?</label>
        <select value={actionType} onChange={(e) => setActionType(e.target.value)}>
          <option value="newProject">Crear un nuevo proyecto</option>
          <option value="addDescription">Añadir una descripción a un proyecto existente</option>
        </select>
      </div>

      {/* Formulario dinámico basado en la opción seleccionada */}
      {actionType === 'newProject' ? (
        <form onSubmit={handleCreateProject}>
          <h3>Crear Nuevo Proyecto</h3>
          <div>
            <label>Nombre del Proyecto</label><br />
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="Nombre del proyecto"
              required
            />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label>Descripciones del Proyecto</label>
            {newDescriptions.map((description, index) => (
              <div key={index} style={{ marginBottom: '0.5rem' }}>
                <textarea
                  value={description}
                  onChange={(e) => {
                    const updatedDescriptions = [...newDescriptions];
                    updatedDescriptions[index] = e.target.value;
                    setNewDescriptions(updatedDescriptions);
                  }}
                  placeholder={`Descripción ${index + 1}`}
                  required
                />
              </div>
            ))}
            <button type="button" onClick={() => setNewDescriptions([...newDescriptions, ''])}>
              Añadir otra descripción
            </button>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label>Compañía</label><br />
            <select
              value={newProjectCompanyId}
              onChange={(e) => setNewProjectCompanyId(e.target.value)}
              required
            >
              <option value="">-- Seleccionar Compañía --</option>
              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" style={{ marginTop: '1rem' }}>Crear Proyecto</button>
        </form>
      ) : (
        <form onSubmit={handleAddDescriptionToProject}>
          <h3>Añadir Descripción a un Proyecto</h3>
          <div>
            <label>Selecciona un Proyecto</label><br />
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
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
            <label>Nueva Descripción</label><br />
            <textarea
              value={newDescriptionForProject}
              onChange={(e) => setNewDescriptionForProject(e.target.value)}
              placeholder="Nueva descripción"
              required
            />
          </div>
          <button type="submit" style={{ marginTop: '1rem' }}>Añadir Descripción</button>
        </form>
      )}

      {/* Listado de proyectos */}
      <h3 style={{ marginTop: '2rem' }}>Proyectos Existentes</h3>
      <ul>
        {projects.map((project) => (
          <li key={project._id} style={{ marginBottom: '1rem' }}>
            <strong>Proyecto:</strong> {project.name}
            <br />
            <strong>Descripciones:</strong>
            <ul>
              {project.descriptions.map((description, index) => (
                <li key={index}>{description}</li>
              ))}
            </ul>
            <strong>Compañía:</strong> {project.companyId?.name || 'No asignada'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Projects;
