import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminIncidents() {
  const [incidents, setIncidents] = useState([]);
  const [techniciens, setTechniciens] = useState([]);

  const fetchIncidents = async () => {
    const res = await axios.get('/api/incidents/admin-list', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setIncidents(res.data);
  };

  const fetchTechniciens = async () => {
    const res = await axios.get('/api/utilisateurs/techniciens', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setTechniciens(res.data);
  };

  const affecter = async (incidentId: number, technicienId: number) => {
    await axios.put(`/api/incidents/affecter/${incidentId}`, { technicien_id: technicienId }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    fetchIncidents();
  };

  useEffect(() => {
    fetchIncidents();
    fetchTechniciens();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Gestion des incidents</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Date</th>
            <th>Affecté à</th>
            <th>Affecter</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((incident: any) => (
            <tr key={incident.id}>
              <td>{incident.description}</td>
              <td>{incident.date}</td>
              <td>{incident.technicien_id || 'Non affecté'}</td>
              <td>
                <select
                  className="form-select"
                  onChange={(e) => affecter(incident.id, Number(e.target.value))}
                  defaultValue=""
                >
                  <option value="" disabled>Choisir</option>
                  {techniciens.map((tech: any) => (
                    <option key={tech.id} value={tech.id}>
                      {tech.nom}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
