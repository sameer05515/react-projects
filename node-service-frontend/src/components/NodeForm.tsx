import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../common/constants/Global";
import { Node } from "./types";


const NodeForm: React.FC = () => {
  const [uniqueId, setUniqueId] = useState<string>("");
  const [metadata, setMetadata] = useState<Record<string, string>>({});
  const [metadataKey, setMetadataKey] = useState<string>("");
  const [metadataValue, setMetadataValue] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  const addMetadata = () => {
    if (metadataKey && metadataValue) {
      setMetadata({ ...metadata, [metadataKey]: metadataValue });
      setMetadataKey("");
      setMetadataValue("");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const node: Node = { uniqueId, metadata };

    try {
      const response = await axios.post(BASE_URL, node);
      setMessage(`Node saved successfully! ID: ${response.data.uniqueId}`);
      setUniqueId("");
      setMetadata({});
    } catch (error) {
      setMessage("Failed to save node. Please try again.");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>Create Node</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="uniqueId" style={{ display: "block", marginBottom: "5px" }}>
            Unique ID
          </label>
          <input
            type="text"
            id="uniqueId"
            value={uniqueId}
            onChange={(e) => setUniqueId(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <h4>Add Metadata</h4>
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="Key"
              value={metadataKey}
              onChange={(e) => setMetadataKey(e.target.value)}
              style={{ flex: 1, padding: "8px" }}
            />
            <input
              type="text"
              placeholder="Value"
              value={metadataValue}
              onChange={(e) => setMetadataValue(e.target.value)}
              style={{ flex: 1, padding: "8px" }}
            />
            <button type="button" onClick={addMetadata} style={{ padding: "8px 12px" }}>
              Add
            </button>
          </div>
          <ul>
            {Object.entries(metadata).map(([key, value], index) => (
              <li key={index}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
        <button type="submit" style={{ padding: "10px 20px", background: "blue", color: "white" }}>
          Save Node
        </button>
      </form>
    </div>
  );
};

export default NodeForm;
