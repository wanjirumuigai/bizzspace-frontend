import "../App.css";
import SpaceContainer from "./SpaceContainer";
import { Route, Routes } from "react-router-dom";
import ViewOneSpace from "./ViewOneSpace";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>BizzSpace</h1>
        <Routes>
          <Route path="/spaces/:id" element={<ViewOneSpace />} />
        </Routes>
        <SpaceContainer />
      </header>
    </div>
  );
}

export default App;
