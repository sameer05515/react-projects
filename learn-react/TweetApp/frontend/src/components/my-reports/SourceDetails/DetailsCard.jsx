import React from "react";
import { Status } from "./SourceDetails.dto";
import { availableOutputTypes, SmartPreviewer } from "../../../common/components/Smart/Editor/v3";

// const headers = [
//   //   "Source Name",
//   "Details",
//   "Purpose & Notes",
// ].map((h, idx) => ({ id: `header_${idx + 1}`, title: h }));

const DetailsCard = ({
  srNo = 0,
  sourceName = "",
  status = Status.NOT_IN_USE,
  sourceType = "",
  location = "",
  repositoryOrDbName = "",
  owner = "",
  criticality = "",
  lastModified = "",
  purpose = "",
  notes = "",
}) => (
  <div className="card shadow-sm bg-black text-light" >
    <div className={`card-header bg-${status === Status.NOT_IN_USE ? "warning" : "success"} text-white`}>{status}</div>
    <div className="card-body" style={{ whiteSpace: "pre-wrap" }}>
      <h4 className="card-title">
        {srNo}: {sourceName}
      </h4>
      <h6 className="card-subtitle mb-2">Source Type: {sourceType}</h6>
      <ul className="list-unstyled mb-0">
        <li>
          <strong>Location:</strong> {location}
        </li>
        <li>
          <strong>Repository/DB Name:</strong> {repositoryOrDbName}
        </li>
        <li>
          <strong>Owner:</strong> {owner}
        </li>
        <li>
          <strong>Criticality:</strong> {criticality}
        </li>
        <li>
          <strong>Last Modified:</strong> {lastModified}
        </li>
      </ul>

      <div class="text-success">
        <hr />
      </div>
      <h5>Purpose: </h5>
      <SmartPreviewer data={{ content: purpose, textOutputType: availableOutputTypes.HTML }} />
      <div class="text-success">
        <hr />
      </div>
      <h5>Notes: </h5>
      <SmartPreviewer data={{ content: notes, textOutputType: availableOutputTypes.HTML }} />
    </div>
  </div>
);

export default DetailsCard;
