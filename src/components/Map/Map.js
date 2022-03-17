import React, { useState, useRef } from "react";
import useSwr from "swr";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";
import "./App.css";

import mapStyles from "./mapStyles";

const Marker = ({ children }) => children;

export default function Map({
  displayPlaces,
  coordinates,
  bounds,
  setBounds,
  zoom,
  setZoom,
  setChildClicked,
}) {
  const mapRef = useRef();

  const crimes = displayPlaces ? displayPlaces.slice(0, 2000) : [];
  const points = crimes.map((crime) => ({
    type: "Feature",
    properties: { cluster: false, id: crime.id },
    geometry: {
      type: "Point",
      coordinates: [parseFloat(crime.longitude), parseFloat(crime.latitude)],
    },
  }));

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KET }}
        center={coordinates}
        defaultZoom={10}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
        }}
        onChange={({ zoom, bounds }) => {
          setChildClicked(""); // 這裡若有改變範圍，把點選清掉
          setZoom(zoom);
          setBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat,
          ]);
        }}
      >
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                lat={latitude}
                lng={longitude}
              >
                <div
                  className="cluster-marker"
                  style={{
                    width: `${10 + (pointCount / points.length) * 20}px`,
                    height: `${10 + (pointCount / points.length) * 20}px`,
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );
                    mapRef.current.setZoom(expansionZoom);
                    mapRef.current.panTo({ lat: latitude, lng: longitude });
                  }}
                >
                  {pointCount}
                </div>
              </Marker>
            );
          }

          return (
            <Marker
              key={`crime-${cluster.properties.id}`}
              lat={latitude}
              lng={longitude}
            >
              <button
                className="crime-marker"
                onClick={() => {
                  setChildClicked(cluster.properties.id);
                }}
              >
                <img src="/custody.svg" alt="hello" />
              </button>
            </Marker>
          );
        })}
      </GoogleMapReact>
    </div>
  );
}
