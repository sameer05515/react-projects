import React from "react";
import DetailsCard from "./DetailsCard";

// const headers = [
//   //   "Source Name",
//   "Details",
//   //   "Purpose & Notes",
// ].map((h, idx) => ({ id: `header_${idx + 1}`, title: h }));

const Table = ({ filteredItems = [], suffixPageItemCount = 0 }) => {
  return (
    <div className="bg-dark align-middle">
      {filteredItems.map((d, idx) => (
        <DetailsCard
          key={`row_data_${suffixPageItemCount + idx + 1}`}
          srNo={suffixPageItemCount + idx + 1}
          sourceName={d.sourceName}
          sourceType={d.sourceType}
          status={d.status}
          location={d.location}
          repositoryOrDbName={d.repositoryOrDbName}
          lastModified={d.lastModified}
          owner={d.owner}
          criticality={d.criticality}
          purpose={d.purpose}
          notes={d.notes}
        />
      ))}
    </div>
  );
};

export default Table;
