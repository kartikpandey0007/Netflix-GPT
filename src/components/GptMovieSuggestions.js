import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList'

const GptMovieSuggestions = () => {
  const{ movieResults, movieNames } = useSelector(store => store.gpt)

   if (!movieNames || !movieResults) {
    return <p className="text-white p-4">Loading suggestions...</p>;
  }

  return (
    <div className='p-4 m-4 bg-black text-white bg-opacity-95'> 
      <div>
        <MovieList title = {movieNames[0]} movies={movieResults[0]}/>
        <MovieList title = {movieNames[1]} movies={movieResults[1]}/>
        <MovieList title = {movieNames[2]} movies={movieResults[2]}/>
        <MovieList title = {movieNames[3]} movies={movieResults[3]}/>
        <MovieList title = {movieNames[4]} movies={movieResults[4]}/>
      </div>
    </div>
  )
}

export default GptMovieSuggestions
