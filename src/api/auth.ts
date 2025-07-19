import axios from 'axios';

const API = 'http://localhost:5000/api/auth';

export const register = (user: { nom: string; email: string; mot_de_passe: string }) => {
  return axios.post(`${API}/register`, user);
};

export const login = (credentials: { email: string; mot_de_passe: string }) => {
  return axios.post(`${API}/login`, credentials);
};
