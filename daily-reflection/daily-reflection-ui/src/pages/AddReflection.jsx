import { useState } from "react";

const API_URL = "http://localhost:8080/api/reflections";

function App() {
  const [formData, setFormData] = useState({
    date: "",
    whatIDidToday: "",
    goodThingToday: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save reflection");
      }

      const savedData = await response.json();

      console.log("Saved:", savedData);

      setMessage("Daily reflection saved successfully!");

      setFormData({
        date: "",
        whatIDidToday: "",
        goodThingToday: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("Failed to save reflection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Daily Reflection</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date</label>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>आज मैंने क्या किया?</label>

          <textarea
            name="whatIDidToday"
            value={formData.whatIDidToday}
            onChange={handleChange}
            placeholder="आज आपने क्या किया?"
            rows="5"
            required
          />
        </div>

        <div className="form-group">
          <label>आज की एक अच्छी बात क्या रही?</label>

          <textarea
            name="goodThingToday"
            value={formData.goodThingToday}
            onChange={handleChange}
            placeholder="आज की अच्छी बात..."
            rows="4"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Reflection"}
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default App;