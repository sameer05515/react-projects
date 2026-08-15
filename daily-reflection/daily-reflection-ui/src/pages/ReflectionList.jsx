import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/api/reflections";

function ReflectionList() {
  const [reflections, setReflections] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Edit popup
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editingReflection, setEditingReflection] = useState(null);
  const [updating, setUpdating] = useState(false);

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

  // Open edit popup
  const handleEdit = (reflection) => {
    setEditingReflection({
      id: reflection.id,
      date: reflection.date,
      whatIDidToday: reflection.whatIDidToday,
      goodThingToday: reflection.goodThingToday,
    });

    setShowEditPopup(true);
  };

  // Close popup
  const handleClosePopup = () => {
    setShowEditPopup(false);
    setEditingReflection(null);
  };

  // Handle edit form changes
  const handleEditChange = (event) => {
    const { name, value } = event.target;

    setEditingReflection((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Update reflection
  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!editingReflection) {
      return;
    }

    try {
      setUpdating(true);

      const response = await fetch(
        `${API_URL}/${editingReflection.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: editingReflection.date,
            whatIDidToday: editingReflection.whatIDidToday,
            goodThingToday: editingReflection.goodThingToday,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update reflection");
      }

      const updatedReflection = await response.json();

      // Update list without another API call
      setReflections((previous) =>
        previous.map((item) =>
          item.id === updatedReflection.id
            ? updatedReflection
            : item
        )
      );

      handleClosePopup();
    } catch (error) {
      console.error(error);
      alert("Failed to update reflection.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <h1>Daily Reflections</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <h1>Daily Reflections</h1>

        {error && <p className="error">{error}</p>}

        {!error && reflections.length === 0 && (
          <p>No reflections found.</p>
        )}

        <div className="reflection-list">
          {reflections.map((reflection) => (
            <div
              className="reflection-card"
              key={reflection.id}
            >
              <div className="reflection-header">
                <h2>{reflection.date}</h2>

                <button
                  className="edit-button"
                  onClick={() => handleEdit(reflection)}
                >
                  Edit
                </button>
              </div>

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

      {/* EDIT POPUP */}

      {showEditPopup && editingReflection && (
        <div
          className="modal-overlay"
          onClick={handleClosePopup}
        >
          <div
            className="modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Edit Reflection</h2>

              <button
                type="button"
                className="close-button"
                onClick={handleClosePopup}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Date</label>

                <input
                  type="date"
                  name="date"
                  value={editingReflection.date}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  आज मैंने क्या किया?
                </label>

                <textarea
                  name="whatIDidToday"
                  value={editingReflection.whatIDidToday}
                  onChange={handleEditChange}
                  rows="5"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  आज की एक अच्छी बात क्या रही?
                </label>

                <textarea
                  name="goodThingToday"
                  value={editingReflection.goodThingToday}
                  onChange={handleEditChange}
                  rows="4"
                  required
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleClosePopup}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="update-button"
                  disabled={updating}
                >
                  {updating ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ReflectionList;