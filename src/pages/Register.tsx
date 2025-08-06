import { useState } from 'react';
import { register } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ nom: '', email: '', mot_de_passe: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(form);
      alert('Inscription réussie !');
      navigate('/login');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erreur');
    }
  };

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

      {/* 📋 Carte formulaire */}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100%', position: 'relative', zIndex: 2, padding: '2rem' }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            padding: '3rem',
            borderRadius: '15px',
            color: 'white',
            maxWidth: '400px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 0 15px rgba(0,0,0,0.3)',
          }}
        >
          {/* ✅ Logo OCP */}
          <img src="/images/ocp-logo.png" alt="OCP Logo" style={{ height: '80px', marginBottom: '1.5rem' }} />

          <h2 className="mb-4" style={{ fontWeight: 'bold' }}>Créer un compte</h2>

          <input
            type="text"
            name="nom"
            placeholder="Nom"
            onChange={handleChange}
            className="form-control mb-3"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="form-control mb-3"
            required
          />

          <input
            type="password"
            name="mot_de_passe"
            placeholder="Mot de passe"
            onChange={handleChange}
            className="form-control mb-4"
            required
          />

          <button type="submit" className="btn btn-success w-100 mb-3 rounded-pill">
            S'inscrire
          </button>

          <p className="text-white">
            Déjà inscrit ? <a href="/login" className="text-success fw-bold">Se connecter</a>
          </p>
        </form>
      </div>
    </div>
  );
}
