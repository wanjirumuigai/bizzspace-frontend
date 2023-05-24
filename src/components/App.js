
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './Search';
// import SpacesPage from './SpacesPage';
import AdvancedSearch from './AdvancedSearch';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/spaces" element={<AdvancedSearch />} />
        
      </Routes>
    </Router>
  );
}

export default App;



