import React, { useState, useEffect, createRef } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import PlaceDetails from "../PlaceDetails/PlaceDetails";

import useStyles from "./styles.js";

const List = ({ displayPlaces, childClicked }) => {
  // 如果有點選時只放點選的，沒有時放篩選後的結果
  const renderList = displayPlaces
    .filter((place) =>
      childClicked ? place.id === childClicked : displayPlaces
    )
    .map((place, i) => {
      return (
        <PlaceDetails
          selected={childClicked}
          place={place}
          key={i}
        ></PlaceDetails>
      );
    });

  return (
    <div style={{ overflowY: "scroll", height: "90vh" }}>{renderList}</div>
  );
};

export default List;
