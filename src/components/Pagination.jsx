import React, { useState } from "react";
import "./styles/Pagination.css"


 const Pagination = ({ location, residentPerPage ,setCurrentPage, currentPage, }) => {
  

  const totalResidents = location?.residents.length;
  /*const [residentPerPage, setResidentPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);


  const lastIndex = currentPage * residentPerPage
  const firstIndex =lastIndex - residentPerPage

  console.log(firstIndex, lastIndex);*/

  const pageNumbers = [];



  for (let i = 1; i <= Math.ceil(totalResidents / residentPerPage); i++) {
    pageNumbers.push(i);
  }

  const onPreviusPage = () => {
    setCurrentPage(currentPage-1)
  }

  const onNextPage  = () => {
    setCurrentPage(currentPage+1)
  }

  const onSpecifiPage = (n) => {
    setCurrentPage (n)
  }

  
  return (
    <nav
      className="pagination is-centered mb-6"
      role="navigation"
    >
      <button className="pagination-previous" onClick={onPreviusPage} disabled={currentPage <= 1}>Previous</button>
      <button className="pagination-next" onClick={onNextPage} disabled={currentPage >= pageNumbers.length}>Next page</button>
      <ul className="pagination-list">
        {pageNumbers.map((noPage) => (
          <li key={noPage}>
            <a
              className={`pagination-link ${
                noPage === currentPage ? "is-current" : ""
              }`}
              onClick={() => onSpecifiPage(noPage)}
            >
              {noPage}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};


export default Pagination