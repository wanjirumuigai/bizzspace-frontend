import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../AdvancedSearch.css'; // Import the CSS file

function AdvancedSearch() {
  const [locationFilter, setLocationFilter] = useState('');
  const [leaseCostFilter, setLeaseCostFilter] = useState('');
  const [spaceTypeFilter, setSpaceTypeFilter] = useState('');
  const [filteredSpaces, setFilteredSpaces] = useState([]);
  const [filterError, setFilterError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSpaces(); // Fetch spaces on component mount
  }, []);

  const fetchSpaces = async () => {
    const response = await fetch('/spaces'); // Make a GET request to the spaces endpoint
    if (!response.ok) {
      console.error('Failed to fetch spaces');
      return;
    }
    const data = await response.json();
    setFilteredSpaces(data);
  };

  const handleFilter = async (e) => {
    e.preventDefault();

    // Validate filter parameters
    if (locationFilter === '' && leaseCostFilter === '' && spaceTypeFilter === '') {
      setFilterError(false); // Clear the error if all parameters are empty
      setFilteredSpaces([]);
      return;
    }

    // Construct the filter query parameters
    const queryParams = new URLSearchParams();
    if (locationFilter !== '') {
      queryParams.append('location', locationFilter);
    }
    if (leaseCostFilter !== '') {
      queryParams.append('lease_cost', leaseCostFilter);
    }
    if (spaceTypeFilter !== '') {
      queryParams.append('space_type', spaceTypeFilter);
    }
    const queryString = queryParams.toString();

    fetch(`/spaces?${queryString}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error searching spaces');
        }
        return response.json();
      })
      .then((data) => {
        setFilteredSpaces(data);
        setFilterError(false);
      })
      .catch((error) => {
        console.error('Error searching spaces:', error);
        setFilterError(true);
      });
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page (Search component)
  };

  return (
    <div>
      <div className="background-container"></div>
      <div className="spaces-page">
        <h2>Advanced Search</h2>
        <form className="filter-form" onSubmit={handleFilter}>
          <input
            type="text"
            placeholder="Location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
          <input
            type="text"
            placeholder="Lease Cost (in KES)"
            value={leaseCostFilter}
            onChange={(e) => setLeaseCostFilter(e.target.value)}
          />
          <input
            type="text"
            placeholder="Space Type"
            value={spaceTypeFilter}
            onChange={(e) => setSpaceTypeFilter(e.target.value)}
          />
          <button type="submit">Filter</button>
          <button className="go-back-button" onClick={handleGoBack}>
            Go Back
          </button>
        </form>

        {filterError ? (
          <p className="error-message">No spaces found based on the filters provided.</p> // Display error message when filters don't match
        ) : filteredSpaces.length > 0 ? (
          <div className="search-results">
            {filteredSpaces.map((space) => (
              <div key={space.id} className="space-card">
                <h4>{space.name}</h4>
                <p>{space.description}</p>
                {/* Display other space details */}
              </div>
            ))}
          </div>
        ) : null} {/* Removed the default message when no filters applied and no spaces available */}
      </div>
    </div>
  );
}

export default AdvancedSearch;
