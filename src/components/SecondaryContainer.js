import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux';

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div>
      <div className="bg-black">
       <div className="-mt-52 pl-4 relative z-20">
      <MovieList title = {"Now Playing Movies"} movies = {movies.nowPlayingMovies}/>
      <MovieList title = {"Trending"} movies = {movies.nowPlayingMovies}/>
      <MovieList title="Popular" movies={movies.popularMovies}/>
      <MovieList title = {"Upcoming Movies"} movies = {movies.nowPlayingMovies}/>
      <MovieList title = {"Horror"} movies = {movies.nowPlayingMovies}/>
      </div>
      </div>
     
    </div>
  )
}

export default SecondaryContainer
