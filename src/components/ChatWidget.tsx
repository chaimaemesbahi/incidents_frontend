import { useState } from 'react';
import './ChatWidget.css';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

interface Suggestion {
  label: string;
  value: string;
}

interface ChatWidgetProps {
  onInterventionCreated?: () => Promise<void>;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ onInterventionCreated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { sender: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setSuggestions([]);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/chatbot/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();

      const botMessage: Message = { sender: 'bot', text: data.response };
      setMessages(prev => [...prev, botMessage]);

      if (data.suggestions && Array.isArray(data.suggestions)) {
        setSuggestions(data.suggestions); // Expecting array of { label, value }
      }

      if (data.created && onInterventionCreated) {
        await onInterventionCreated();
      }
    } catch (error) {
      console.error("Erreur d'API:", error);
      setMessages(prev => [...prev, { sender: 'bot', text: "Erreur lors de la réponse du bot." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (value: string) => {
    setInput(value);
    sendMessage(value);
  };

  return (
    <div className="chat-widget">
      <div className="chat-button" onClick={toggleChat}>
        💬
      </div>

      {isOpen && (
        <div className="chat-popup">
          <div className="chat-header">Assistant</div>
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {loading && <div className="chat-message bot">⏳ Le bot réfléchit...</div>}
          </div>

          {suggestions.length > 0 && (
            <div className="chat-suggestions">
              {suggestions.map((sugg, idx) => (
                <button key={idx} onClick={() => handleSuggestionClick(sugg.value)}>
                  {sugg.label}
                </button>
              ))}
            </div>
          )}

          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder="Écris un message..."
            />
            <button onClick={() => sendMessage(input)} disabled={loading}>
              Envoyer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
