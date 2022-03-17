import React, { useState, useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  CircularProgress,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";

import useStyles from "./styles";

const Header = ({
  places,
  setDisplayPlaces,
  tasty,
  setTasty,
  cheap,
  setCheap,
}) => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <FormControl className={classes.formControl}>
          <InputLabel id="tasty">好喝程度</InputLabel>
          <Select
            id="tasty"
            value={tasty}
            onChange={(e) => setTasty(e.target.value)}
          >
            <MenuItem value="all">全部</MenuItem>
            <MenuItem value="3">3星以上</MenuItem>
            <MenuItem value="4">4星以上</MenuItem>
            <MenuItem value="5">5星</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="cheap">找便宜</InputLabel>
          <Select
            id="cheap"
            value={cheap}
            onChange={(e) => setCheap(e.target.value)}
          >
            <MenuItem value="all">全部</MenuItem>
            <MenuItem value="3">3星以上</MenuItem>
            <MenuItem value="4">4星以上</MenuItem>
            <MenuItem value="5">5星</MenuItem>
          </Select>
        </FormControl>
        {/* <Autocomplete> */}
        {/* </Autocomplete> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
