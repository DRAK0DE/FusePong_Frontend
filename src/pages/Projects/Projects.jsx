import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [actionType, setActionType] = useState('newProject');
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
    <div className='contentProjects' >
      <h2 className='contentProjects__titulo'>Proyectos</h2>

      <div className='contentProjects__option option' >
        <label className='option__label'>¿Qué deseas hacer?</label> 
        <select className='option__select' value={actionType} onChange={(e) => setActionType(e.target.value)}>
          <option value="newProject">Crear un nuevo proyecto</option>
          <option value="addDescription">Añadir una historia de usuario a un proyecto ya creado</option>
        </select>
      </div>

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
            <label>Historia de Usuario</label>
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
            <button className='form__button'  type="button" onClick={() => setNewDescriptions([...newDescriptions, ''])}>
              Añadir otra historia de usuario
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
          <button className='form__button'  type="submit" style={{ marginTop: '1rem' }}>Crear Proyecto</button>
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
