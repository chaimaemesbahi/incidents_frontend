import axios from 'axios';

const API = 'http://localhost:5000/api/interventions';

const getToken = () => localStorage.getItem('token');

export const fetchInterventions = () => {
  return axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};

export const updateInterventionStatut = (id: number, statut: string) => {
  return axios.put(`http://localhost:5000/api/interventions/${id}/statut`, 
    { statut },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
};
