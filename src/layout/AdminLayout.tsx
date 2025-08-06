import { Outlet, useNavigate, Link } from 'react-router-dom';
import { CSSProperties } from 'react';

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Voulez-vous vraiment vous déconnecter ?')) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <div>
          <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '2rem' }}>OCP - ADMIN</h3>
          <Link to="/dashboard" style={sidebarLinkStyle}>🏠 Dashboard</Link>
          <Link to="/incidents" style={sidebarLinkStyle}>📄 Incidents</Link>
          <Link to="/interventions" style={sidebarLinkStyle}>🛠️ Interventions</Link>
          <Link to="/chatbot" style={sidebarLinkStyle}>🤖 Chatbot</Link>
        </div>
      </aside>

      {/* Bouton déconnexion fixé */}
      <button onClick={handleLogout} style={logoutButtonStyle}>🔓 Déconnexion</button>

      {/* Main content */}
      <main style={{ flexGrow: 1, background: '#f5f5f5', padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
}

const sidebarStyle: CSSProperties = {
  width: '220px',
  background: '#02475e',
  color: '#fff',
  padding: '1.5rem 1rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  minHeight: '100vh'
};

const sidebarLinkStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
  fontSize: '0.95rem',
  color: '#fff',
  textDecoration: 'none',
  padding: '0.4rem 0',
  cursor: 'pointer'
};

const logoutButtonStyle: CSSProperties = {
  position: 'fixed',
  bottom: '20px',
  left: '30px',
  backgroundColor: '#dc3545',
  color: '#fff',
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
  zIndex: 1000
};
