 import React, { useState, useEffect } from "react";
import EarthquakeMap from "./components/EarthquakeMap";
import EarthquakeList from "./components/EarthquakeList";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";

import "./App.css";

const EARTHQUAKE_API_URL =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

export default function App() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEarthquakeData() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(EARTHQUAKE_API_URL);
        if (!response.ok) {
          throw new Error("Unable to load earthquake data.");
        }
        const data = await response.json();
        if (!data.features || data.features.length === 0) {
          setError("No earthquakes found today.");
          setEarthquakes([]);
        } else {
          setEarthquakes(data.features);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchEarthquakeData();
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Earthquake Visualizer</h1>
      </header>

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <main className="main-content">
          <EarthquakeMap earthquakes={earthquakes} />
          <EarthquakeList earthquakes={earthquakes} />
        </main>
      )}
    </div>
  );
}
