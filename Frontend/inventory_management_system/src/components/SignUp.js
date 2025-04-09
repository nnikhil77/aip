import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.status === 201) {
        alert("Signup successful! Please log in.");
        navigate("/login");
      } else if (res.status === 409) {
        setError("User already exists.");
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-start vh-100 bg-light pt-5">
  <div className="border rounded p-4 shadow bg-white" style={{ minWidth: "350px", maxWidth: "400px", width: "100%" }}>
    <h2 className="text-center mb-4">Signup</h2>
    <form onSubmit={handleSignup}>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">Signup</button>
    </form>
    {error && <p className="text-danger text-center mt-3">{error}</p>}
  </div>
</div>

  
  );
}
