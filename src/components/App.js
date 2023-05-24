import "../App.css";
import { useState } from "react";
import {Routes, Route} from "react-router-dom"
import NavBar from "./NavBar"
import Home from "./Home"
import Login from "./Login"
import SignUp from "./SignUp"
import ViewOneSpace from "./ViewOneSpace"

function App() {
  const [user, setUser] = useState(null);

  function onLogin(user){
    setUser(user)
  }

  function onLogout(){
    setUser(null)
  }

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login onLogin={onLogin}/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/spaces/:id" element={<ViewOneSpace user={user}/>} />
      </Routes>
    </div>
  );
}

export default App;
