import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div className="container p-5">
            <h1>HEY! IT'S NEEK!</h1>
            <div id="chat-container" className='border rounded p-3 my-3'>
                {/* CHAT & MESSAGING */}
            </div>
            <div id="chat-input" className='input-group'>
                <input type="text" className='form-control' placeholder="SPEAK TO NEEK?" />
                <button className="btn btn-primary" type="button">SEND</button>
            </div>
        </div>
    );
}

export default App;