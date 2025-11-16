import React, { useEffect, useState } from "react";
import JSONDataViewer from "../../common/components/json-data-viewer/JSONDataViewer";
import { apiRequest } from "../../common/service/apiClient/v1";

const debugJSONDataViewer = false;
const revisionAPIBaseUrl="http://localhost:8085/api/revisions";
const RevisionHelperV1 = () => {
  const [revision, setRevision] = useState({
    revisionAfter: 0,
    text: "",
    createdDate: "",
  });

  const [revisions, setRevisions] = useState([]);
  const [revisionsForGivenDate, setRevisionsForGivenDate] = useState([]);

  const fetchRevisionsForGivenDate = (targetDate = "") => {
    if (!targetDate) return;
    apiRequest({
      url: `${revisionAPIBaseUrl}/for-date?targetDate=${targetDate}`,
    })
      .then((resp) => {
        console.log(resp);
        setRevisionsForGivenDate([...resp.data]);
      })
      .catch((err) => console.log("Error occurred", err));
  };

  const fetchRevisions = () => {
    apiRequest({ url: revisionAPIBaseUrl })
      .then((resp) => {
        console.log(resp);
        setRevisions([...resp.data]);
      })
      .catch((err) => console.log("Error occurred", err));
  };

  useEffect(() => fetchRevisions(), []);

  const valid = () => {
    if (!revision.text || !revision.text.trim()) return false;
    if (revision.revisionAfter <= 0) return false;
    return true;
  };

  const handleSave = () => {
    if (valid()) {
      console.log(revision);
      apiRequest({
        url: revisionAPIBaseUrl,
        method: "post",
        data: revision,
      })
        .then((res) => {
          console.log(res);
          fetchRevisions();
        })
        .catch((err) => console.log("Error occurred", err));
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-primary">Revision Helper V1</h1>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Show Revision Items for Date</h5>
          <div className="mb-3">
            <input
              type="date"
              className="form-control"
              id="targetDate"
              onChange={(e) => fetchRevisionsForGivenDate(e.target.value)}
            />
          </div>

          {revisionsForGivenDate.map((rev) => (
            <div key={rev.id} className="border-bottom py-2">
              <strong>{rev.text}</strong> | {rev.createdDate} | After each {rev.revisionAfter} day(s)
            </div>
          ))}
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Add New Revision</h5>

          <div className="mb-3">
            <label htmlFor="revisionAfter" className="form-label">
              Revision After (days)
            </label>
            <input
              type="number"
              className="form-control"
              id="revisionAfter"
              value={revision.revisionAfter}
              onChange={(e) => setRevision((prev) => ({ ...prev, revisionAfter: +e.target.value }))}
              min={0}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="text" className="form-label">
              Text
            </label>
            <textarea
              className="form-control"
              id="text"
              rows="3"
              value={revision.text}
              onChange={(e) => setRevision((prev) => ({ ...prev, text: e.target.value }))}
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="createdDate" className="form-label">
              Created Date
            </label>
            <input
              type="date"
              className="form-control"
              id="createdDate"
              value={revision.createdDate}
              onChange={(e) => setRevision((prev) => ({ ...prev, createdDate: e.target.value }))}
            />
          </div>

          <button className="btn btn-success" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>

      {debugJSONDataViewer && (
        <JSONDataViewer title="JSON Data Viewer" metadata={{ revision, revisionsForGivenDate }} />
      )}

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">All Revisions</h5>
          {revisions.map((rev) => (
            <div key={rev.id} className="border-bottom py-2">
              <strong>{rev.text}</strong> | {rev.createdDate} | After each {rev.revisionAfter} day(s)
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevisionHelperV1;
