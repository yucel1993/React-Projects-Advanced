import axios from "axios";
import { useDispatch } from "react-redux";
import {
  fetchFail,
  fetchStart,
  getMoviesSuccess,
  getGenresSuccess,
  getRecommedationSuccess,
  
} from "../feature/movieSlice";
import { getFavoriteOrWatchListSuccess } from "../feature/favoriteOrWatchListSlice";

// Import the API key correctly


const useMovieCall = () => {
  const tmdbApiKey=import.meta.env.VITE_APP_TMDB_KEY
  const BASE_URL = "https://api.themoviedb.org/3";
  const dispatch = useDispatch();

  const getMovies = async (category, page = 1,searchQuery="") => {
    dispatch(fetchStart());
    try {
        console.log(searchQuery)
      //* Serach Query
      if(searchQuery){
        const { data } = await axios(
          `${BASE_URL}/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`
        );
        return dispatch(getMoviesSuccess({ data }));
      }
      

      //*Get Movies by Categories
      if (category && typeof category === "string") {
        const { data } = await axios(
          `${BASE_URL}/movie/${category}?page=${page}&api_key=${tmdbApiKey}`
        );
        return dispatch(getMoviesSuccess({ data }));
      }

      //*Get Movies by Genre
      if (category && typeof category === "number") {
        const { data } = await axios(
          `${BASE_URL}/discover/movie?with_genres=${category}&page=${page}&api_key=${tmdbApiKey}`
        );
        return dispatch(getMoviesSuccess({ data }));
      }

      //*Get Popular Movies
      const { data } = await axios(
        `${BASE_URL}/movie/popular?page=${page}&api_key=${tmdbApiKey}`
      );
      dispatch(getMoviesSuccess({ data }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const getGenres = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axios(
        `${BASE_URL}/genre/movie/list?language=en&api_key=${tmdbApiKey}`
      );
      dispatch(getGenresSuccess({ data }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const getRecommendation = async ({list, movie_id}) => {
    console.log("getrecomeme",movie_id,list)
    dispatch(fetchStart());
    try {
      const { data } = await axios(
        `${BASE_URL}/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`
      );
      dispatch(getRecommedationSuccess({ data }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };


  const getFavoriteOrWatchList = async ({word, movie_id}) => {
    console.log("favorite or WatchList",word,movie_id)
    
    try {
      const { data } = await axios(
        `${BASE_URL}/movie/${movie_id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`
      );
      dispatch(getFavoriteOrWatchListSuccess({word, data }));
      console.log("getFavori or watchlist mopvie:",data,word)
    } catch (error) {
      
      console.log(error);
    }
  };
  



  return { getMovies, getGenres,getRecommendation,getFavoriteOrWatchList };
};

export default useMovieCall;
