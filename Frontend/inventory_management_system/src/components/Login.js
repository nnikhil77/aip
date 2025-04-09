// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ setLoggedIn, setUserEmail }) {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (res.status === 200) {
        sessionStorage.setItem("user", email);
        setLoggedIn(true);
        setUserEmail(email);
        navigate('/products');
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.log(err);
      setError("Server error");
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-start vh-100 bg-light pt-5">
  <div className="border rounded p-4 shadow bg-white" style={{ minWidth: "350px", maxWidth: "400px", width: "100%" }}>
    <h2 className="text-center mb-4">Login</h2>
    <form onSubmit={handleLogin}>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">Login</button>
      {error && <div className="text-danger text-center mt-3">{error}</div>}
    </form>
  </div>
</div>

  );
}
