import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="mb-4"> Bienvenue sur la plateforme OCP</h1>
      <p className="lead mb-5">Gérez facilement vos incidents et interventions.</p>

      <Link to="/interventions" className="btn btn-primary btn-lg">
        Voir les Interventions
      </Link>
    </div>
  );
}
