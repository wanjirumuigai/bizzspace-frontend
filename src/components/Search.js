

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Search.css';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    

    fetch(`/spaces?query=${searchQuery}`)
      .then((response) => {
        console.log('Response:', response);
        if (!response.ok) {
          throw new Error('Error searching spaces');
        }
        return response.json();
      })
      .then((data) => {
        setSearchResults(data.results);
        setError('');
      })
      .catch((error) => {
        console.error('Error searching spaces:', error);
        setError('An error occurred while searching spaces.');
      });

    setSearchQuery('');
  };

  const handleNavigateToAdvancedSearch = () => {
    navigate('/spaces'); // Navigate to the SpacesPage
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="search-container">
      <h2>Search Spaces</h2>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          className="search-input"
          type="text"
          placeholder="Search here..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button" type="submit">
          Search
        </button>
        {location.pathname === '/spaces' ? (
          <button className="go-back-button" onClick={handleGoBack}>
            Go Back
          </button>
        ) : (
          <button className="advanced-search-button" onClick={handleNavigateToAdvancedSearch}>
            Advanced Search
          </button>
        )}
      </form>

      {error && <p className="error-message">{error}</p>}

      {searchResults.length > 0 && (
        <div>
          <h3>Search Results:</h3>
          <div className="search-results">
            {searchResults.map((result) => (
              <div key={result.id} className="space-card">
                <img src={result.image} alt={result.name} />
                <h4>{result.name}</h4>
                <p>{result.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
