import "../App.css";
import {Routes, Route} from "react-router-dom"
import NavBar from "./NavBar"
import Home from "./Home"
import Login from "./Login"
import SignUp from "./SignUp"

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
