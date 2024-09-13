import React from 'react'

const styles = {
    jsonPreview: {
        border: "1px solid #ddd",
        padding: "6px",
    },
}

const JSONPreview = ({ data, style }) => (
    <div style={{ ...styles.jsonPreview, ...style }}>
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
);

export default JSONPreview