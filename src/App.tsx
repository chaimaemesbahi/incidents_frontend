import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Incidents from './pages/Incidents';
import Interventions from './pages/Interventions';
import Home from './pages/Home';

import AdminIncidents from './pages/AdminIncidents';
import TechnicienIncidents from './pages/TechnicienIncidents';
import AdminLayout from './layout/AdminLayout';
import AffectationIncidents from './pages/AffectationIncidents'; // 🆕

function AppWrapper() {
  return (
    <Routes>
      {/* 🌐 Pages publiques */}
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* 🔐 Pages privées avec layout admin (sidebar) */}
      <Route element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/incidents" element={<Incidents />} />
        <Route path="/interventions" element={<Interventions />} />
        
        <Route path="/admin/incidents" element={<AffectationIncidents />} />
        <Route path="/technicien/incidents" element={<TechnicienIncidents />} />
        <Route path="/admin/incidents/list" element={<AdminIncidents />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
