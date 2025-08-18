import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import gemini from "../utils/gemini";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  //search movie in tmdb
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGeminiSearch = async () => {
    const query =
      "Act as a Movie Recommendation system and suggest movies for the query: " +
      searchText.current.value +
      ". Only give me names of 5 movies, comma separated. Example: Movie1, Movie2, Movie3, Movie4, Movie5. else  write only -> can't find";

    try {
      const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(query);
      const response = await result.response;
      const text = await response.text();

      const geminiMovies = text.split(","); //array of movies searched

      const promiseArray = geminiMovies.map((movie) => searchMovieTMDB(movie)); //searchMovieTMDB(movie) async function take time return promise and promise will take some time to resolve
      const tmdbResults = await Promise.all(promiseArray); //push into store and then show
      dispatch(
        addGptMovieResult({
          movieNames: geminiMovies,
          movieResults: tmdbResults,
        })
      ); //now can use movies from store ,also pass movie names got from gemini
    } catch (error) {
      console.error("Error:", error);
      alert(
        "The AI model is currently overloaded. Please try again in a few moments."
      );
    }
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12 bg-opacity-80 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3 "
          onClick={handleGeminiSearch}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
