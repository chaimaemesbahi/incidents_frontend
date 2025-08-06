import { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchAllInterventions } from '../api/interventions';

export default function AffectationIncidents() {
  const [interventions, setInterventions] = useState([]);
  const [techniciens, setTechniciens] = useState([]);

  const loadData = async () => {
    try {
      const [intervRes, techRes] = await Promise.all([
        fetchAllInterventions(),
        axios.get('http://localhost:5000/api/techniciens'),
      ]);
      setInterventions(intervRes.data);
      setTechniciens(techRes.data);
    } catch (err) {
      console.error('Erreur chargement:', err);
    }
  };

  const assignTechnicien = async (interventionId: number, technicienId: number) => {
    try {
      await axios.put(`http://localhost:5000/api/interventions/${interventionId}/assign`, {
        technicienId,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      loadData(); // Recharger les données après affectation
    } catch (err) {
      console.error('Erreur assignation:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📋 Liste des interventions</h2>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Description</th>
            <th>Technicien</th>
            <th>Affecter à</th>
            <th>Date</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {interventions.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center text-muted">
                Aucune intervention trouvée.
              </td>
            </tr>
          ) : (
            interventions.map((interv: any) => (
              <tr key={interv.id}>
                <td>{interv.incident_description || 'N/A'}</td>
                <td>{interv.technicien_nom || 'Aucun'}</td>
                <td>
                  <select
                    className="form-select"
                    defaultValue=""
                    onChange={(e) =>
                      assignTechnicien(interv.id, parseInt(e.target.value))
                    }
                  >
                    <option disabled value="">
                      -- Choisir technicien --
                    </option>
                    {techniciens.map((tech: any) => (
                      <option key={tech.id} value={tech.id}>
                        {tech.nom}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{new Date(interv.date_intervention).toLocaleString()}</td>
                <td>{interv.statut || 'N/A'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
