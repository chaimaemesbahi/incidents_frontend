import axios from 'axios';

const API = 'http://localhost:5000/api/incidents';

const getToken = () => localStorage.getItem('token');

export const createIncident = (description: string) => {
  return axios.post(API, { description }, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};

export const fetchIncidents = () => {
  return axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};
