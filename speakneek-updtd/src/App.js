import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Message({ text, isUser }) {
    return (
        <div className={`message ${isUser ? 'text-end' : 'text-start'}`}>
            <span className={`badge ${isUser ? 'bg-primary' : 'bg-secondary'}`}>
                {isUser ? 'You' : 'Neek'}
            </span>
            <p>{text}</p>
        </div>
    );
}

function App() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, isUser: true }]);
            setInput('');
            
            try {
                const response = await axios.post('http://localhost:5000/api/chat', { message: input });
                setMessages(prevMessages => [...prevMessages, { text: response.data.message, isUser: false }]);
            } catch (error) {
                console.error('Error sending message:', error);
                setMessages(prevMessages => [...prevMessages, { text: "Sorry, I'm having trouble responding right now.", isUser: false }]);
            }
        }
    };

    return (
        <div className="container p-5">
            <h1>HEY! IT'S NEEEEEEEEEeK!</h1>
            <div id="chat-container" className='border rounded p-3 my-3' style={{height: '400px', overflowY: 'auto'}}>
                {messages.map((message, index) => (
                    <Message key={index} text={message.text} isUser={message.isUser} />
                ))}
            </div>
            <div id="chat-input" className='input-group'>
                <input 
                    type="text" 
                    className='form-control' 
                    placeholder="SPEAK TO NEEK?" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button className="btn btn-primary" type="button" onClick={handleSend}>SEND</button>
            </div>
        </div>
    );
}

export default App;