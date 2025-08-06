import axios from 'axios';

export const createIncident = async (description: string) => {
  const token = localStorage.getItem('token');
  await axios.post('http://localhost:5000/api/incidents', { description }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchIncidents = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get('http://localhost:5000/api/incidents', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
