import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/api/reflections";

function ReflectionList() {
  const [reflections, setReflections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadReflections = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch reflections");
      }

      const data = await response.json();

      setReflections(data);
    } catch (error) {
      console.error(error);
      setError("Unable to load reflections.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReflections();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <h1>Daily Reflections</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Daily Reflections</h1>

      {error && <p className="error">{error}</p>}

      {!error && reflections.length === 0 && (
        <p>No reflections found.</p>
      )}

      <div className="reflection-list">
        {reflections.map((reflection) => (
          <div className="reflection-card" key={reflection.id}>
            <h2>{reflection.date}</h2>

            <div className="reflection-section">
              <h3>आज मैंने क्या किया?</h3>
              <p>{reflection.whatIDidToday}</p>
            </div>

            <div className="reflection-section">
              <h3>आज की एक अच्छी बात</h3>
              <p>{reflection.goodThingToday}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReflectionList;