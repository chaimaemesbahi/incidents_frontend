import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';

export default function Login() {
  const [form, setForm] = useState({ email: '', mot_de_passe: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(form);
      localStorage.setItem('token', res.data.token);
      alert('Connexion réussie !');
      navigate('/dashboard');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erreur de connexion');
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
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: 1,
        }}
      ></div>

      {/* 🧾 Carte login */}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100%', position: 'relative', zIndex: 2, padding: '2rem' }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            padding: '3rem',
            borderRadius: '15px',
            color: 'white',
            maxWidth: '400px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 0 20px rgba(0,0,0,0.3)',
          }}
        >
          {/* ✅ Logo OCP */}
          <img src="/images/ocp-logo.png" alt="OCP Logo" style={{ height: '80px', marginBottom: '1.5rem' }} />

          <h2 className="mb-4" style={{ fontWeight: 'bold' }}>Connexion</h2>

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
            Se connecter
          </button>

          <p className="text-white">
            Pas encore de compte ? <a href="/register" className="text-success fw-bold">S'inscrire</a>
          </p>
        </form>
      </div>
    </div>
  );
}
