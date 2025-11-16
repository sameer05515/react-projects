import React, { useCallback, useMemo } from "react";
import { myDataSources } from "./data";
import Table from "./Table";
import { useNavigate, useSearchParams } from "react-router-dom";

const PageSize = 10;
const TotalVisibleLinks = 3;

const PaginationNavigator = ({ currentPage, totalPages, onPageChange }) => {
  const createPageLinks = useCallback(() => {
    const startPage = Math.max(1, currentPage - Math.floor(TotalVisibleLinks / 2));
    const endPage = Math.min(totalPages, startPage + TotalVisibleLinks - 1);

    const links = [];
    for (let i = startPage; i <= endPage; i++) {
      links.push(
        <li className={`page-item ${i === currentPage ? "active" : ""}`} key={i}>
          <button className="page-link" onClick={() => onPageChange(i)}>
            {i}
          </button>
        </li>
      );
    }
    return links;
  }, [currentPage, onPageChange, totalPages]);

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination pagination-sm justify-content-center">
        {/* Previous Button */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
        </li>

        {/* Page Links */}
        {createPageLinks()}

        {/* Next Button */}
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

const SourceDetailsV1 = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentPage = +searchParams.get("pageNo") || 1;
  //   const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => Math.ceil(myDataSources.length / PageSize), []);

  const handlePageChange = useCallback(
    (page) => {
      // setCurrentPage(page);
      navigate(`/my-reports?version=datasources-v1&pageNo=${page}`);
    },
    [navigate]
  );

  const filteredItems = useMemo(() => myDataSources.slice((currentPage - 1) * PageSize, currentPage * PageSize), [currentPage]);

  return (
    <div className="container-fluid min-vh-100 bg-dark text-white">
      <h2 className="text-center my-4">Source Details</h2>
      <PaginationNavigator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      <Table filteredItems={filteredItems} suffixPageItemCount={(currentPage - 1) * PageSize} />
      <PaginationNavigator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default SourceDetailsV1;
