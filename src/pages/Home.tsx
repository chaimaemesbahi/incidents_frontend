import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* 🎥 Vidéo de fond */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src="/videos/ocp-background.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas les vidéos HTML5.
      </video>

      {/* 🧊 Calque flouté */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backdropFilter: 'blur(6px)',
          backgroundColor: 'rgba(0,0,0,0.3)',
          zIndex: 1,
        }}
      ></div>

      {/* 📝 Carte centrale */}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: '100%',
          position: 'relative',
          zIndex: 2,
          padding: '2rem',
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            padding: '3rem',
            borderRadius: '15px',
            boxShadow: '0 0 20px rgba(0,0,0,0.3)',
            maxWidth: '600px',
            width: '100%',
            textAlign: 'center',
            color: '#fff',
          }}
        >
          {/* ✅ Logo OCP */}
          <img
            src="/images/ocp-logo.png"
            alt="Logo OCP"
            style={{ height: '80px', marginBottom: '1.5rem' }}
          />

          <h1 className="mb-4" style={{ fontWeight: 'bold' }}>
            Bienvenue sur la plateforme OCP
          </h1>
          <p className="lead mb-4">
            Gérez facilement vos <strong>incidents</strong> et <strong>interventions</strong>.
          </p>
          <Link to="/Login" className="btn btn-success btn-lg px-4">
            Accéder à la plateforme
          </Link>
        </div>
      </div>
    </div>
  );
}
