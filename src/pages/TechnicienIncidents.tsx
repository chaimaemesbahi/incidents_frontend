import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TechnicienIncidents() {
  const [incidents, setIncidents] = useState([]);

  const fetchIncidents = async () => {
    const res = await axios.get('/api/incidents/technicien-list', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setIncidents(res.data);
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Mes incidents</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Date</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((incident: any) => (
            <tr key={incident.id}>
              <td>{incident.description}</td>
              <td>{incident.date}</td>
              <td>{incident.statut}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
