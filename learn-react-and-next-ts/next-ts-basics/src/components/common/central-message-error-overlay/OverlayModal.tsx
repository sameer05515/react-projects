import React from "react";

interface OverlayModalProps {
  loading: boolean;
  error: string | null;
}

const OverlayModal: React.FC<OverlayModalProps> = ({ loading, error }) => {
  if (!loading && !error) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modalContent}>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed" as "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center" as "center",
  },
};

export default OverlayModal;
