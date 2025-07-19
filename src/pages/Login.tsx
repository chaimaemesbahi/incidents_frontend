import { useState } from 'react';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';

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
      navigate('/dashboard'); // ou une autre page protégée
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erreur de connexion');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Connexion</h2>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="mot_de_passe" placeholder="Mot de passe" onChange={handleChange} />
      <button type="submit">Se connecter</button>
    </form>
  );
}
