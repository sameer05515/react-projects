// WordList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWords } from '../../redux/slices/wordsSlice';
// import ReactHtmlParser from "react-html-parser";
import { SmartPreviewer } from '../../common/components/smart-editor/SmartEditorV3';

const WordList = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.words);

  useEffect(() => {
    // Fetch words when the component mounts
    dispatch(fetchWords({ page: 1, pageSize: 10 }));
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    // Fetch words when the page changes
    dispatch(fetchWords({ page: newPage, pageSize: 10 }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // const customStyles = {
  //   ol: {
  //     display: 'block',
  //     marginLeft: '1em', // Adjust as needed
  //   },
  // };

  return (
    <div>
      <div>
        {data.map((word) => (
          <div key={word.id} className="word-card">
            <h3>{word.word}</h3>
            <p>Type: {word.type}</p>
            {/* <p>{word.details}</p> */}
            {/* <p style={customStyles}>{ReactHtmlParser(word.details || "")}</p> */}
            {/* <p><HtmlTextRendrer htmlString={word.details} /></p> */}
            <SmartPreviewer data={{content:word.details||'', textOutputType: 'html'}}/>
          </div>
        ))}
      </div>
      <div className="pagination">
        <Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

// Pagination.js
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className="pagination-list">
      {pages.map((page) => (
        <li key={page} className={page === currentPage ? 'active' : ''}>
          <button onClick={() => onPageChange(page)}>{page}</button>
        </li>
      ))}
    </ul>
  );
};

export default WordList;
