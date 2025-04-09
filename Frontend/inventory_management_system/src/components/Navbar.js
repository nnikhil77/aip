// Navbar.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Navbar({ loggedIn, userEmail, handleLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const onLoginPage = location.pathname === "/login";
  const onSignupPage = location.pathname === "/signup";

  return (
    <nav className="navbar bg-danger px-4">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <span className="fs-4 text-white">IMS</span>
        </a>

        <ul className="navbar-nav d-flex flex-row gap-4 mb-0 align-items-center">
          <li className="nav-item">
            <a className="nav-link text-white fs-5" href="/about">About</a>
          </li>

          {!loggedIn && onLoginPage && (
            <li className="nav-item">
              <a className="nav-link text-white fs-5" href="/signup">SignUp</a>
            </li>
          )}
          {!loggedIn && onSignupPage && (
            <li className="nav-item">
              <a className="nav-link text-white fs-5" href="/login">Login</a>
            </li>
          )}

          {loggedIn && (
            <>
              <li className="nav-item text-white fs-6 d-flex align-items-center">
                Welcome, {userEmail}
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
