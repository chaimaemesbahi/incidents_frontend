import { useEffect, useState } from 'react';
import { fetchInterventions, updateInterventionStatut } from '../api/interventions';

export default function Interventions() {
  const [interventions, setInterventions] = useState([]);

  const loadInterventions = async () => {
    try {
      const res = await fetchInterventions();
      setInterventions(res.data);
    } catch (error) {
      console.error("Erreur lors du chargement des interventions");
    }
  };

  useEffect(() => {
    loadInterventions();
  }, []);

  const handleChangeStatut = async (id: number, statut: string) => {
    await updateInterventionStatut(id, statut);
    loadInterventions();
  };

  const getBadgeClass = (statut: string) => {
    switch (statut) {
      case 'terminee':
        return 'bg-success';
      case 'en_cours':
        return 'bg-warning text-dark';
      case 'en_attente':
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📋 Mes interventions</h2>

      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Description</th>
              <th>Technicien</th>
              <th>Date</th>
              <th>Statut</th>
              <th>Changer le statut</th>
            </tr>
          </thead>
          <tbody>
            {interventions.map((intervention: any) => (
              <tr key={intervention.id}>
                <td>{intervention.description}</td>
                <td>{intervention.technicien}</td>
                <td>{new Date(intervention.date_intervention).toLocaleString()}</td>
                <td>
                  <span className={`badge ${getBadgeClass(intervention.statut)} px-2 py-1`}>
                    {intervention.statut.replace('_', ' ')}
                  </span>
                </td>
                <td>
                  <select
                    className="form-select form-select-sm"
                    value={intervention.statut || 'en_attente'}
                    onChange={(e) => handleChangeStatut(intervention.id, e.target.value)}
                  >
                    <option value="en_attente">En attente</option>
                    <option value="en_cours">En cours</option>
                    <option value="terminee">Terminée</option>
                  </select>
                </td>
              </tr>
            ))}

            {interventions.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-muted py-3">
                  Aucune intervention trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
