import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Incidents from './pages/Incidents';
import Interventions from './pages/Interventions';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import ChatBot from './pages/ChatBot';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* ✅ Page d’accueil accessible à tous */}
        <Route path="/" element={<Home />} />

        {/* ✅ Pages publiques */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Routes protégées */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/chatbot" element={<ChatBot />} />
                <Route
          path="/chatbot"
          element={
            <PrivateRoute>
              <ChatBot />
            </PrivateRoute>
          }
        />

        <Route
          path="/incidents"
          element={
            <PrivateRoute>
              <Incidents />
            </PrivateRoute>
          }
        />

        <Route
          path="/interventions"
          element={
            <PrivateRoute>
              <Interventions />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
