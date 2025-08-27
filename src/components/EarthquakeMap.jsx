import React from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function magnitudeToColor(mag) {
  return mag >= 5 ? "#d73027" : mag >= 3 ? "#fc8d59" : "#fee08b";
}

function magnitudeToRadius(mag) {
  return mag ? Math.max(mag * 4, 4) : 4;
}

export default function EarthquakeMap({ earthquakes }) {
  return (
    <div style={{ flex: 2, height: "100%", minHeight: "400px" }}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        />

        {earthquakes.map(({ id, geometry, properties }) => {
          const [lon, lat] = geometry.coordinates;
          const { mag, place, time } = properties;
          return (
            <CircleMarker
              key={id}
              center={[lat, lon]}
              radius={magnitudeToRadius(mag)}
              fillColor={magnitudeToColor(mag)}
              color="#000"
              weight={1}
              fillOpacity={0.7}
              stroke={true}
            >
              <Popup>
                <div>
                  <strong>{place}</strong>
                  <br />
                  Magnitude: {mag}
                  <br />
                  Time: {new Date(time).toLocaleString()}
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
