import { useEffect } from "react";
import { MOVIE_TRAILER } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    //fetch trailer video
    getMovieVideos();
  }, []);

  const getMovieVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      MOVIE_TRAILER
    );
    const json = await data.json();
    dispatch(addTrailerVideo(json.results[0]));
  };
};

export default useMovieTrailer;
