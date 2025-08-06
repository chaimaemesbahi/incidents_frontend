import { useEffect, useState } from 'react';
import {
  fetchAllInterventions,
  updateInterventionStatut,
} from '../api/interventions';
import axios from 'axios';

interface Intervention {
  id: number;
  description: string;
  date_intervention: string;
  statut: string;
  technicien_id: number | null;
  incident_description: string;
  technicien_nom: string | null;
  sla: number; // durée en heures
}

interface Technicien {
  id: number;
  nom: string;
}

export default function Interventions() {
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [techniciens, setTechniciens] = useState<Technicien[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadInterventions = async () => {
    try {
      const res = await fetchAllInterventions();
      setInterventions(res.data);
      setError(null);
    } catch (error: any) {
      setError('Erreur lors du chargement des interventions');
    } finally {
      setLoading(false);
    }
  };

  const fetchTechniciens = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/techniciens', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTechniciens(res.data);
    } catch (err) {
      console.error('Erreur chargement techniciens', err);
    }
  };

  useEffect(() => {
    loadInterventions();
    fetchTechniciens();
  }, []);

  const handleChangeStatut = async (id: number, statut: string) => {
    try {
      await updateInterventionStatut(id, statut);
      await loadInterventions();
    } catch (error) {
      console.error('Erreur mise à jour statut:', error);
    }
  };

  const handleAssignTechnicien = async (id: number, technicienId: string) => {
    try {
      await axios.put(`http://localhost:5000/api/interventions/${id}/assign`, {
        technicienId,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      await loadInterventions();
    } catch (err) {
      console.error('Erreur affectation', err);
    }
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

  const getProgressColor = (statut: string) => {
    switch (statut) {
      case 'terminee':
        return 'bg-success';
      case 'en_cours':
        return 'bg-warning';
      case 'en_attente':
      default:
        return 'bg-secondary';
    }
  };

  const calculateSlaProgress = (statut: string): number => {
    switch (statut) {
      case 'en_attente':
        return 20;
      case 'en_cours':
        return 50;
      case 'terminee':
        return 100;
      default:
        return 0;
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status" />
        <p className="mt-2">Chargement des interventions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📋 Liste des interventions</h2>

      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Incident</th>
              <th>Affecter à</th>
              <th>Date</th>
              <th style={{ minWidth: '170px' }}>SLA</th>
              <th>Statut</th>
              <th>Changer le statut</th>
            </tr>
          </thead>
          <tbody>
            {interventions.map((intervention) => {
              const slaProgress = calculateSlaProgress(intervention.statut);
              return (
                <tr key={intervention.id}>
                  <td>{intervention.id}</td>
                  <td>{intervention.description || 'Non défini'}</td>
                  <td>{intervention.incident_description || 'Non défini'}</td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={intervention.technicien_id || ''}
                      onChange={(e) => handleAssignTechnicien(intervention.id, e.target.value)}
                    >
                      <option value="">-- Choisir --</option>
                      {techniciens.map((tech) => (
                        <option key={tech.id} value={tech.id}>{tech.nom}</option>
                      ))}
                    </select>
                    {intervention.technicien_nom && (
                      <small className="text-muted d-block">
                        Assigné à: {intervention.technicien_nom}
                      </small>
                    )}
                  </td>
                  <td>
                    {intervention.date_intervention
                      ? new Date(intervention.date_intervention).toLocaleString('fr-FR')
                      : 'Non définie'}
                  </td>
                  <td>
                    <div className="progress" style={{ height: '20px' }}>
                      <div
                        className={`progress-bar ${getProgressColor(intervention.statut)}`}
                        role="progressbar"
                        style={{ width: `${slaProgress}%` }}
                      >
                        {slaProgress}%
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${getBadgeClass(intervention.statut)} px-2 py-1`}>
                      {(intervention.statut || 'en_attente').replace('_', ' ')}
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
              );
            })}
            {interventions.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center text-muted py-3">
                  Aucune intervention trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {interventions.length > 0 && (
        <div className="mt-3">
          <small className="text-muted">
            {interventions.length} intervention(s) trouvée(s)
          </small>
        </div>
      )}
    </div>
  );
}
