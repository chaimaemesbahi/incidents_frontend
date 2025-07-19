import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

interface Stats {
  totalInterventions: number;
  interventionsTerminees: number;
  interventionsEnCours: number;
  totalIncidents: number;
}

const COLORS = ['#28a745', '#ffc107', '#6c757d'];

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(res.data);
    } catch (error) {
      console.error("Erreur chargement dashboard", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const pieData = stats
    ? [
        { name: 'Terminées', value: stats.interventionsTerminees },
        { name: 'En cours', value: stats.interventionsEnCours },
        {
          name: 'En attente',
          value:
            stats.totalInterventions -
            stats.interventionsTerminees -
            stats.interventionsEnCours,
        },
      ]
    : [];

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📊 Tableau de Bord</h2>

      {!stats ? (
        <p>Chargement...</p>
      ) : (
        <>
          {/* 🟦 Cartes stats */}
          <div className="row g-4 mb-5">
            <div className="col-md-3">
              <div className="card text-white bg-primary">
                <div className="card-body">
                  <h5 className="card-title">Total Interventions</h5>
                  <p className="card-text fs-3">{stats.totalInterventions}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-white bg-success">
                <div className="card-body">
                  <h5 className="card-title">Terminées</h5>
                  <p className="card-text fs-3">{stats.interventionsTerminees}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-dark bg-warning">
                <div className="card-body">
                  <h5 className="card-title">En cours</h5>
                  <p className="card-text fs-3">{stats.interventionsEnCours}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-white bg-secondary">
                <div className="card-body">
                  <h5 className="card-title">Total Incidents</h5>
                  <p className="card-text fs-3">{stats.totalIncidents}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 🟢 Graphique */}
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <h4 className="text-center mb-3">Répartition des interventions</h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
