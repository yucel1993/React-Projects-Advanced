import React from "react";
import { Grid } from "@mui/material";
import useStyles from "./styles";
import Movie from "../Movie/Movie";

const MovieList = ({ movies }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.moviesContainer}>
      {movies?.results?.map((movie, id) => (
        <Movie movie={movie} key={id} />
      ))}
    </Grid>
  );
};

export default MovieList;
