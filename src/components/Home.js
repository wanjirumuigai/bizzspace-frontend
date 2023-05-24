import React, { useState, useEffect } from "react";

function Home() {

  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/spaces")
      .then((res) => res.json())
      .then((data) => setSpaces(data));
  }, []); 


  const searchStyle = {
    // display: "flex",
    // padding: "20px",
    // justifyContent: "center",
    // gap: "50px",
    color: "black",
  };
  
    return (
      <div
        className="card"
        style={searchStyle}
      >
          {/* <img src="..." class="card-img-top" alt="..."/>THIS WILL BE BACKGROUND IMAGE */}
          <div className="searchfilterunderlayimage">

            <div className="card-body stylingfiltersearch">
              <h1 id="h1-in-search-div">Discover your next business space</h1>
              <select name="filter" >
                <option value="All">Filter listings by city</option>
                <option value="Nairobi">Nairobi</option>
                <option value="Kisumu">Kisumu</option>
                <option value="Mombasa">Mombasa</option>
              </select>

              <input id="searchinput" type="text" name="search" placeholder="🔍Search..."/>


            </div>
            <div class="search-filter-overlay"></div>
          </div>
          <div className="card-body menu-container">{/*style={{ width: "18rem" }}*/}
              {/* <p>SpaceCards will go here</p> */}
              {spaces.map((spaceItem) => {
                console.log(spaces)
              return (    
                  <div className="card" style={{width: "18rem"}} >
                      <img src={spaceItem.image_url} className="card-img-top" alt="..."/>
                      <div className="card-body">
                          <h5 className="card-title blackentext" >{spaceItem.name}</h5>
                          <p className="card-text">Space details</p>
                      </div>
                      
                      <div className="card-body">
                          <a href="#" className="btn btn-primary">See more</a>
                          {/* <a href="#" className="btn btn-primary">Another link</a> */}
                      </div>
                  </div>
                 ); 
              })} 
          </div>
  
      </div>
    );
  }
  
export default Home;