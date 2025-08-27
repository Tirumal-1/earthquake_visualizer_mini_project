import React from "react";

export default function ErrorMessage({ message }) {
  return (
    <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
      {message}
    </div>
  );
}
