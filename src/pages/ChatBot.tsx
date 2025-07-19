import React, { useState } from 'react';
import axios from 'axios';

const ChatBot: React.FC = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
  if (!message.trim()) return;

  setLoading(true);
  try {
    const res = await axios.post('http://localhost:8000/api/chatbot/', {
      message,
      utilisateur_id: 1
    });

    setResponse(res.data.response);
  } catch (error: any) {
    console.error(" ERREUR Axios :", error.response || error.message);
    setResponse(" Erreur lors de la requête");
  }
  setLoading(false);
  setMessage('');
};


  return (
    <div className="container mt-5" style={{ maxWidth: 600 }}>
      <h2 className="mb-4">💬 Chatbot - Création d'incident</h2>
      
      <div className="form-group">
        <label htmlFor="message">Votre message :</label>
        <textarea
          className="form-control"
          id="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <button
        className="btn btn-primary mt-3"
        onClick={handleSend}
        disabled={loading}
      >
        {loading ? "Envoi..." : "Envoyer"}
      </button>

      {response && (
        <div className="alert alert-info mt-4" role="alert">
          {response}
        </div>
      )}
    </div>
  );
};

export default ChatBot;
