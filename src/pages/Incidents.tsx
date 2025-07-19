import { useState, useEffect } from 'react';
import { createIncident, fetchIncidents } from '../api/incidents';

export default function Incidents() {
  const [description, setDescription] = useState('');
  const [incidents, setIncidents] = useState([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createIncident(description);
    setDescription('');
    loadIncidents();
  };

  const loadIncidents = async () => {
    const res = await fetchIncidents();
    setIncidents(res.data);
  };

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <div>
      <h2>Créer un Incident</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Décris ton problème"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Créer</button>
      </form>

      <h3>Mes incidents</h3>
      <ul>
        {incidents.map((incident: any) => (
          <li key={incident.id}>
            {incident.description} — {new Date(incident.date_creation).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
