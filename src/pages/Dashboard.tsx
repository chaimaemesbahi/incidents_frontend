import { useEffect, useState } from 'react';
import axios from 'axios';
import ChatWidget from '../components/ChatWidget';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from 'recharts';

interface Stats {
  totalInterventions: number;
  interventionsTerminees: number;
  interventionsEnCours: number;
  en_attente: number;
  totalIncidents: number;
}

const COLORS = ['#28a745', '#ffc107', '#6c757d'];

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  const fetchStats = async () => {
    try {
      const res = await axios.get<Stats>(
        'http://localhost:5000/api/stats/dashboard-stats',
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      setStats(res.data);
    } catch (err) {
      console.error('Erreur récupération stats', err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div className="container mt-5">
        <h2>Dashboard - Home</h2>
      </div>
    );
  }

  const pieData = [
    { name: 'Terminées', value: stats.interventionsTerminees },
    { name: 'En cours', value: stats.interventionsEnCours },
    { name: 'En attente', value: stats.en_attente }
  ];
  const barData = pieData;

  return (
    <div className="container mt-5">
      {/* Header */}
      <header style={headerStyle}>
        <h2 style={{ margin: 0 }}>Dashboard - Home</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span style={{ fontWeight: 'bold' }}>ADMIN</span>
          <div
            style={{
              width: '25px',
              height: '25px',
              backgroundColor: '#fff',
              borderRadius: '50%',
              border: '2px solid #333'
            }}
          />
        </div>
      </header>

      {/* Stat cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}
      >
        <StatCard title="Total Interventions" value={stats.totalInterventions} color="#28a745" />
        <StatCard title="Terminées" value={stats.interventionsTerminees} color="#007bff" />
        <StatCard title="En cours" value={stats.interventionsEnCours} color="#ffc107" />
        <StatCard title="En attente" value={stats.en_attente} color="#6c757d" />
        <StatCard title="Incidents" value={stats.totalIncidents} color="#dc3545" />
      </div>

      {/* Graphiques */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px' }}>
          <h4>Comparaison des interventions</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2db37c" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px' }}>
          <h4>Répartition</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ percent = 0 }) => `${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ✅ Chatbot avec rafraîchissement */}
      <ChatWidget onInterventionCreated={fetchStats} />
    </div>
  );
}

function StatCard({
  title,
  value,
  color
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderLeft: `6px solid ${color}`,
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
      }}
    >
      <h5 style={{ margin: '0 0 0.5rem', fontWeight: 'normal', color: '#555' }}>{title}</h5>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color }}>{value}</div>
    </div>
  );
}

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: 'linear-gradient(90deg, #c4d82d, #2db37c)',
  color: '#fff',
  padding: '1rem 2rem',
  borderRadius: '8px',
  marginBottom: '2rem'
};
