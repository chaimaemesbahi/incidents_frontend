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
      alert(err.response.data.message || 'Erreur');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Inscription</h2>
      <input name="nom" placeholder="Nom" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="mot_de_passe" placeholder="Mot de passe" onChange={handleChange} />
      <button type="submit">S'inscrire</button>
    </form>
  );
}
