import React from "react";

export default function EarthquakeList({ earthquakes }) {
  return (
    <aside
      style={{
        flex: 1,
        overflowY: "auto",
        backgroundColor: "#111",
        padding: "1rem",
        fontSize: "0.9rem",
      }}
    >
      <h2 style={{ marginTop: 0 }}>Recent Earthquakes</h2>

      {earthquakes.length === 0 ? (
        <p>No recent earthquakes</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {earthquakes.map(({ id, properties }) => (
            <li
              key={id}
              style={{
                marginBottom: "1rem",
                borderBottom: "1px solid #444",
                paddingBottom: "0.5rem",
              }}
            >
              <strong>{properties.place}</strong>
              <br />
              Magnitude: {properties.mag}
              <br />
              Time: {new Date(properties.time).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
