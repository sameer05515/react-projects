import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWords } from "../../redux/slices/wordsSlice";
import { SmartPreviewer } from "../../common/components/Smart/Editor/v3";

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
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-lg text-gray-600">Loading words...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-800 font-semibold text-lg mb-2">Error Loading Words</p>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Words Dictionary</h1>
      
      {/* Top Pagination */}
      <div className="mb-6 flex justify-center">
        <Pagination currentPage={currentPage} totalPages={5} onPageChange={handlePageChange} />
      </div>

      {/* Words List */}
      <div className="space-y-4 mb-6">
        {data && data.length > 0 ? (
          data.map((word) => (
            <div 
              key={word.id} 
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-2xl font-bold text-blue-800">{word.word}</h3>
                {word.type && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {word.type}
                  </span>
                )}
              </div>
              {word.details && (
                <div className="mt-4 text-gray-700 prose prose-sm max-w-none">
                  <SmartPreviewer data={{ content: word.details || "", textOutputType: "html" }} />
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500 text-lg">No words found</p>
          </div>
        )}
      </div>

      {/* Bottom Pagination */}
      <div className="flex justify-center">
        <Pagination currentPage={currentPage} totalPages={5} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => currentPage + i - 2).filter((i) => i > 0 && i <= totalPages);

  return (
    <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md font-medium transition-colors ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        Previous
      </button>
      
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-md font-medium transition-colors min-w-[40px] ${
            page === currentPage
              ? "bg-blue-700 text-white font-bold shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`px-4 py-2 rounded-md font-medium transition-colors ${
          currentPage >= totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        Next
      </button>
    </nav>
  );
};

export default WordList;
