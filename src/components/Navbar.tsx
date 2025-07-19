import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">OCP Gestion</Link>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          {token && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/incidents">Incidents</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/interventions">Interventions</Link>
              </li>
                <li className="nav-item">
                <a className="nav-link" href="/chatbot">🤖 Chatbot</a>
                </li>

            </>
          )}
        </ul>

        <ul className="navbar-nav">
          {!token ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Connexion</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Créer un compte</Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Déconnexion</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
