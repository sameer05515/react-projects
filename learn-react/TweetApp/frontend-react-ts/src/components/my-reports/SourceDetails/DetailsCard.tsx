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
  <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
    <div className={`${status === Status.NOT_IN_USE ? "bg-amber-500" : "bg-emerald-600"} rounded-t-xl px-4 py-2 text-white`}>
      {status}
    </div>
    <div className="whitespace-pre-wrap p-4">
      <h4 className="mb-1 text-lg font-semibold text-gray-900">
        {srNo}: {sourceName}
      </h4>
      <h6 className="mb-2 text-sm text-gray-700">Source Type: {sourceType}</h6>
      <ul className="mb-0 list-none space-y-1 text-sm text-gray-800">
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

      <hr className="my-3 border-gray-200" />
      <h5 className="mb-1 font-semibold text-gray-900">Purpose: </h5>
      <SmartPreviewer data={{ content: purpose, textOutputType: availableOutputTypes.HTML, textInputType: "TextArea" }} />
      <hr className="my-3 border-gray-200" />
      <h5 className="mb-1 font-semibold text-gray-900">Notes: </h5>
      <SmartPreviewer data={{ content: notes, textOutputType: availableOutputTypes.HTML, textInputType: "TextArea" }} />
    </div>
  </div>
);

export default DetailsCard;
