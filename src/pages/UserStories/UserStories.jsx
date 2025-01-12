import React, { useEffect, useState } from 'react';

function UserStories() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    // Data dummy
    const dummyStories = [
      {
        _id: 'us1',
        title: 'Poder tener un carrito de compras por usuario',
        project: 'Proyecto E-commerce',
        ticketsCount: 3,
      },
      {
        _id: 'us2',
        title: 'Permitir registro y login de usuaroooo',
        project: 'Proyecto Web App',
        ticketsCount: 2,
      },
    ];
    setStories(dummyStories);
  }, []);

  return (
    <div style={{ margin: '2rem' }}>
      <h2>Historias de Usuario</h2>
      <ul>
        {stories.map((story) => (
          <li key={story._id}>
            <strong>{story.title}</strong> - Proyecto: {story.project} - #Tickets: {story.ticketsCount}
          </li>
        ))}
      </ul>

      {/* Agregar botón para crear nueva historia de usuario */}
    </div>
  );
}

export default UserStories;
