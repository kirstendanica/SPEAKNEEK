import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';
import Register from './Register';
import Login from './Login';

function Message({ text, isUser, timestamp }) {
    return (
        <div className={`message ${isUser ? 'text-end' : 'text-start'}`}>
            <span className={`badge ${isUser ? 'badge-gecko' : 'bg-secondary'}`}>
                {isUser ? 'You' : 'Neek'}
            </span>
            <p className="text-gecko">{text}</p>
            <small className="text-muted">{new Date(timestamp).toLocaleTimeString()}</small>
        </div>
    );
}

function App() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSend = async () => {
        if (input.trim()) {
            const newMessage = { text: input, isUser: true, timestamp: new Date() };
            setMessages([...messages, newMessage]);
            setInput('');
            setIsTyping(true);
            
            try {
                const response = await axios.post('http://localhost:5000/api/chat', { message: input });
                setIsTyping(false);
                setMessages(prevMessages => [...prevMessages, { 
                    text: response.data.message, 
                    isUser: false, 
                    timestamp: new Date() 
                }]);
            } catch (error) {
                console.error('Error sending message:', error);
                setIsTyping(false);
                setMessages(prevMessages => [...prevMessages, { 
                    text: "Sorry, I'm having trouble responding right now.", 
                    isUser: false, 
                    timestamp: new Date()
                }]);
            }
        }
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setShowLogin(false);
    };

    if (showRegister) {
        return <Register />;
    }

    if (showLogin) {
        return <Login onLoginSuccess={handleLoginSuccess} />;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4 text-gecko">HEY! IT'S NEEEEEEEEEeK!</h1>
            {isLoggedIn ? (
                <div className="card card-gecko">
                    <div className="card-body bg-gecko" style={{height: '400px', overflowY: 'auto'}}>
                        {messages.map((message, index) => (
                            <Message key={index} text={message.text} isUser={message.isUser} timestamp={message.timestamp} />
                        ))}
                        {isTyping && (
                            <div className="typing-indicator mb-2">
                                <span className="badge badge-gecko">Neek is typing...</span>
                            </div>
                        )}
                    </div>
                    <div className="card-footer bg-gecko">
                        <div className="input-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="SPEAK TO NEEK?"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <button className="btn btn-primary" type="button" onClick={handleSend}>SEND</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <button 
                        className="btn btn-primary me-2" 
                        onClick={() => setShowLogin(true)}
                    >
                        LOGIN
                    </button>
                    <button 
                        className="btn btn-secondary" 
                        onClick={() => setShowRegister(true)}
                    >
                        REGISTER
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;