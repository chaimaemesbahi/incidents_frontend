import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Incident {
  id: number;
  description: string;
  date_creation: string;
}

export default function Incidents() {
  const [description, setDescription] = useState('');
  const [incidents, setIncidents] = useState<Incident[]>([]);

  const fetchIncidents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/incidents', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setIncidents(res.data);
    } catch (err) {
      console.error('Erreur chargement incidents', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/incidents', { description }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setDescription('');
      fetchIncidents();
    } catch (err) {
      console.error('Erreur création incident', err);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  return (
    <div className="container mt-5">
      <h3>Créer un incident</h3>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success">Créer</button>
      </form>

      <h4>📋 Incidents récents</h4>
      <ul className="list-group">
        {incidents.map((i) => (
          <li className="list-group-item" key={i.id}>
            {i.description} — <small>{new Date(i.date_creation).toLocaleString('fr-FR')}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
