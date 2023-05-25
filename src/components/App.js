import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "../App.css";

import NavBar from "./NavBar";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import ViewOneSpace from "./ViewOneSpace";
import CreateSpace from "./CreateSpace";

function App() {
  const [user, setUser] = useState(null);

  function onLogin(user) {
    setUser(user);
  }

  function onLogout() {
    setUser(null);
  }

  return (
    <div className="App">
      <NavBar user={user} onLogout={onLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/spaces/:id"
          element={
            user ? <ViewOneSpace user={user} /> : <Login onLogin={onLogin} />
          }
        />
        {user ? <Route path="/spaces/new" element={<CreateSpace user={user}/>} /> : null}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login onLogin={onLogin} />} />
      </Routes>
    </div>
  );
}

export default App;
