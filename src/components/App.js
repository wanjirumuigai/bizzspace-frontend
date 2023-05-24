import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "../App.css";
import NavBar from "./NavBar";
import CreateSpace from "./CreateSpace";
import SpaceCard from "./SpaceCard";


function App() {

  const [space, setSpace] = useState([]);

  function onAddSpace(spaceItem) {
    setSpace([...space, spaceItem]);
    }

  return (
    <>
       <NavBar />
       <Routes>
       <Route path="/home" element={<SpaceCard />} />
       <Route path="/space/new" element={<CreateSpace onAddSpace={ onAddSpace}/>} />

       </Routes>
    </>
  );
}

export default App;
