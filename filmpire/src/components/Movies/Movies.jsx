import React from "react";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import MovieList from "../MovieList/MovieList";
import { useEffect } from "react";
import useMovieCall from "../hooks/useMovieCall";

const Movies = () => {
  const { getMovies } = useMovieCall();
  const { movies,loading } = useSelector((state) => state.movies);

  useEffect(() => {
    getMovies();
  }, []);

  if (loading) { // Check the 'loading' property from the Redux state
    return (
      <Box display="flex" justifyContent={"center"}>
        <CircularProgress size="4rem" />
      </Box>
    );
  }
  if(!movies?.results?.length){
    return(
      <Box display={"flex"} alignItems={"center"} mt="20px" >
      <Typography variant="h4">No movies that match that name</Typography>
      <br />
      Please search for something else
      </Box>
    )
  }

 

  return (
    <div>
      <MovieList movies={movies} />
    </div>
  );
};

export default Movies;
