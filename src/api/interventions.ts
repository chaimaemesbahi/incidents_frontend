import axios from 'axios';

const API = 'http://localhost:5000/api/interventions';

const getToken = () => localStorage.getItem('token');

export const fetchAllInterventions = () => {
  return axios.get(`${API}/admin`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};

export const updateInterventionStatut = (id: number, statut: string) => {
  return axios.put(`${API}/${id}/statut`,
    { statut },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
};
