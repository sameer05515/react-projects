import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWords } from "../../redux/slices/wordsSlice";
import { SmartPreviewer } from "../../common/components/Smart/Editor/v3";
import { useState } from "react";

const WordList = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.words);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch words when the component mounts
    dispatch(fetchWords({ page: 1, pageSize: 10 }));
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    // Fetch words when the page changes
    dispatch(fetchWords({ page: newPage, pageSize: 10 }));
    setCurrentPage(newPage);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <div>
        <div className="pagination">
          <Pagination currentPage={currentPage} totalPages={5} onPageChange={handlePageChange} />
        </div>
        {data.map((word) => (
          <div key={word.id} className="card mb-4 shadow-sm word-card">
            <h3>{word.word}</h3>
            <p>Type: {word.type}</p>
            {/* <p>{word.details}</p> */}
            {/* <p style={customStyles}>{ReactHtmlParser(word.details || "")}</p> */}
            {/* <p><HtmlTextRendrer htmlString={word.details} /></p> */}
            <SmartPreviewer data={{ content: word.details || "", textOutputType: "html" }} />
          </div>
        ))}
      </div>
      <div className="pagination">
        <Pagination currentPage={currentPage} totalPages={5} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

// Pagination.js
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => currentPage + i - 2).filter((i) => i > 0);

  return (
    <ul className="pagination">
      <li class="page-item">
        <button onClick={() => onPageChange(currentPage - 1)} className="page-link" disabled={currentPage === 1}>
          Previous
        </button>
      </li>
      {pages.map((page) => (
        <li key={page} className={page === currentPage ? "page-item active" : "page-item"}>
          <button className="page-link" onClick={() => onPageChange(page)}>
            {page}
          </button>
        </li>
      ))}
      <li class="page-item">
        <button onClick={() => onPageChange(currentPage + 1)} className="page-link">
          Next
        </button>
      </li>
    </ul>
  );
};

export default WordList;
