import React, { useState } from "react";
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await axios.post('http://localhost:5000/api/register', { username, password });
      setSuccess("SUCCESSSSSSSSS!");
      setUsername("");
      setPassword("");
    } catch (error) {
      setError(error.response?.data?.message || "Something failed... Please try again.");
    }
  };

  return (
    <div className="container mt-5">
    <h2>Ready to adopt?</h2>
    {error && <div className="alert alert-danger">{error}</div>}
    {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            USERNAME
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            PASSWORD
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          ADOPT
        </button>
      </form>
    </div>
  );
}

export default Register;