import React, { useState, useEffect } from 'react';
import api from '../../services/api';


function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [editTicketId, setEditTicketId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      const response = await api.get('/tickets');
      setTickets(response.data);
    };
    fetchTickets();
  }, []);

  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      await api.put(`/tickets/${ticketId}`, { status: newStatus });
      alert('Estado actualizado con éxito');
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === ticketId ? { ...ticket, status: newStatus } : ticket
        )
      );
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
      alert('Error al actualizar el estado');
    }
  };

  const enableEditTicket = (ticket) => {
    setEditTicketId(ticket._id);
    setEditedTitle(ticket.title);
  };

  const saveTicketChanges = async (ticketId) => {
    try {
      await api.put(`/tickets/${ticketId}`, { title: editedTitle });
      alert('Ticket actualizado con éxito');
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === ticketId ? { ...ticket, title: editedTitle } : ticket
        )
      );
      setEditTicketId(null);
    } catch (error) {
      console.error('Error al actualizar el ticket:', error);
      alert('Error al actualizar el ticket');
    }
  };

  return (
    <div className='contentTickets' >
      <h2 className='contentTickets__titulo'>Listado de Tickets</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {tickets.map((ticket) => (
          <li
            key={ticket._id}
            style={{
              marginBottom: '1rem',
              borderBottom: '1px solid #ddd',
              paddingBottom: '1rem',
            }}
          >
            <p>
              <strong>Proyecto:</strong> {ticket.projectId?.name || 'Sin proyecto asignado'}
            </p>
            <p>
            <strong>Descripción:</strong> {ticket.description || 'Sin descripción'}
            </p>
            <p>
              <strong>Ticket:</strong>
              {editTicketId === ticket._id ? (
                <>
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    style={{ marginLeft: '0.5rem' }}
                  />
                  <button
                    onClick={() => saveTicketChanges(ticket._id)}
                    style={{ marginLeft: '0.5rem' }}
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditTicketId(null)}
                    style={{ marginLeft: '0.5rem', color: 'red' }}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  {ticket.title}
                  <button
                    onClick={() => enableEditTicket(ticket)}
                    style={{ marginLeft: '0.5rem' }}
                  >
                    Editar
                  </button>
                </>
              )}
            </p>
            <p>
              <strong>Estado:</strong>
              <select
                value={ticket.status}
                onChange={(e) => handleStatusChange(ticket._id, e.target.value)}
                style={{ marginLeft: '0.5rem' }}
              >
                <option value="Activo">Activo</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Finalizado">Finalizado</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </p>
            <p>
              <strong>Compañía:</strong> {ticket.projectId?.companyId?.name || 'No asignada'}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tickets;
