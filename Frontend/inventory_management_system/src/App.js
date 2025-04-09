// App.js
import './App.css';
import Navbar from './components/Navbar';
import Products from './components/Products';
import InsertProduct from './components/InsertProduct';
import UpdateProduct from './components/UpdateProduct';
import About from './components/About';
import Signup from './components/SignUp';
import Login from './components/Login';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(() => !!sessionStorage.getItem("user"));
  const [userEmail, setUserEmail] = useState(() => sessionStorage.getItem("user"));

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setLoggedIn(false);
    setUserEmail("");
  };

  useEffect(() => {
    const email = sessionStorage.getItem("user");
    if (email) {
      setLoggedIn(true);
      setUserEmail(email);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar loggedIn={loggedIn} userEmail={userEmail} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Login setLoggedIn={setLoggedIn} setUserEmail={setUserEmail} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setUserEmail={setUserEmail} />} />
          <Route path="/products" element={loggedIn ? <Products /> : <Navigate to="/login" />} />
          <Route path="/insertproduct" element={<InsertProduct />} />
          <Route path="/updateproduct/:id" element={<UpdateProduct />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
