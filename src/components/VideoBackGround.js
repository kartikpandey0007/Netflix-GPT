import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackGround = ({ movieId }) => {
  //const [tarilerId,setTrailerId] = useState(null)-> use redux store instead
  //use dispatch()

  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  

  useMovieTrailer(movieId);

   if (!trailerVideo || !trailerVideo.key) {
    return null; // or a loading spinner/shimmer
  }

  return (
     <div className="w-screen">
      <iframe
        className="w-screen aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo.key +
          "?autoplay=1&mute=1&controls=0&loop=1&playlist=" +
          trailerVideo.key
        }
        title="YouTube video player"
        allow="autoplay; encrypted-media"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default VideoBackGround;
