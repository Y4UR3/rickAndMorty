import { useEffect, useRef, useState } from "react";
import "./App.css";
import useFetch from "./hooks/useFetch";
import getRandomNumber from "./utils/getRandomNumber";
import LocationCard from "./components/LocationCard";
import ResidentCard from "./components/ResidentCard";
import Pagination from "./components/Pagination";

function App() {
  const locationId = getRandomNumber(126);
  const [inputValue, setInputValue] = useState(locationId);
  const url = `https://rickandmortyapi.com/api/location/${inputValue}`;
  const [location, getLocation, hasError] = useFetch(url);
  

  const [residentPerPage, setResidentPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);


  const lastIndex = currentPage * residentPerPage
  const firstIndex =lastIndex - residentPerPage

  useEffect(() => {
    getLocation();
  }, [inputValue]);

  const inputLocation = useRef();

  const handleSubmint = (e) => {
    e.preventDefault();
    setInputValue(inputLocation.current.value);
  };

  const pageReset = () =>{
    setCurrentPage (1)
  }


  return (
    <div>
      <h1 className="header"></h1>
      <form className="form" onSubmit={handleSubmint}>
        <div className="form_item">
          <input
            placeholder="Write an id between 1 and 126"
            className="form_input"
            ref={inputLocation}
            type="text"

          />
          <button className="form_btn" onClick={pageReset}>Search</button>
        </div>
      </form>
      {hasError ? (
        <div className="haserror">
          <h2 className="haserror_h2">
            ✖️ HEY! you must providean id from 1 to 126
          </h2>
        </div>
      ) : (
        <>
          <div className="location_container">
            <LocationCard location={location} />
          </div>

          <div className="resident_container">
            {location?.residents.map((url) => (
              <ResidentCard key={url} url={url} location={location} />
            )).slice(firstIndex, lastIndex)}
          </div>
          <Pagination 
            location={location} 
            currentPage={currentPage}
            residentPerPage={residentPerPage}
            setCurrentPage={setCurrentPage}
            setResidentPerPage={setResidentPerPage}
          />

          <footer className="footer">
            <p>All Rights Reserved</p>
            <p>&copy; 2024 </p>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
