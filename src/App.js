import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import ClickMobile from "./components/ClickMobile/ClickMobile";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [displayPlaces, setDisplayPlaces] = useState([]);
  const [zoom, setZoom] = useState(12);
  const [bounds, setBounds] = useState(null);

  // 初始經緯度
  const [coordinates, setCoordinates] = useState({
    lat: 25.047675,
    lng: 121.517055,
  });

  // 設定篩選
  const [tasty, setTasty] = useState("all");
  const [cheap, setCheap] = useState("all");

  // 設定點選 Marker
  const [childClicked, setChildClicked] = useState();

  console.log(childClicked);

  // 要求經緯度
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  // 接資料
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5000/cafe");
      const obj = await res.json();
      setPlaces(obj);
      setDisplayPlaces(obj);
    };
    fetchData();
  }, []);

  // 篩選 + 經緯度(範圍)改變時 render
  useEffect(() => {
    let newPlaces = places.filter(
      (place) =>
        place.latitude < bounds[3] &&
        place.latitude > bounds[1] &&
        place.longitude < bounds[2] &&
        place.longitude > bounds[0]
    );

    newPlaces =
      tasty !== "all"
        ? newPlaces.filter((place) => place.tasty >= tasty)
        : newPlaces;

    newPlaces =
      cheap !== "all"
        ? newPlaces.filter((place) => place.cheap >= cheap)
        : newPlaces;

    setDisplayPlaces(newPlaces);
  }, [bounds, tasty, cheap]);

  return (
    <div style={{ overflow: "hidden" }}>
      <CssBaseline />
      <Header
        places={places}
        setDisplayPlaces={setDisplayPlaces}
        tasty={tasty}
        setTasty={setTasty}
        cheap={cheap}
        setCheap={setCheap}
      />

      <div className="row">
        <div className="d-none d-sm-block col-6">
          {" "}
          <List childClicked={childClicked} displayPlaces={displayPlaces} />
        </div>
        <div className="col-12 col-sm-6">
          {" "}
          <Map
            coordinates={coordinates}
            zoom={zoom}
            setZoom={setZoom}
            setCoordinates={setCoordinates}
            bounds={bounds}
            setBounds={setBounds}
            setChildClicked={setChildClicked}
            displayPlaces={displayPlaces}
          />
          <ClickMobile
            childClicked={childClicked}
            displayPlaces={displayPlaces}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
