import React, { useState, useEffect } from "react";

import "./style.css";

const ClickMobile = ({ displayPlaces, childClicked }) => {
  const [selected, setSelected] = useState();

  useEffect(() => {
    if (childClicked !== "") setSelected(childClicked);
  }, [childClicked]);

  const render = displayPlaces
    .filter((place) => (selected ? place.id === selected : null))
    .map((place, i) => {
      return <div key={i}>{place.name}</div>;
    });

  return <>{childClicked && <div className="click-mobile">{render}</div>}</>;
};

export default ClickMobile;
