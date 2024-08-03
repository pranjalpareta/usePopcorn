/* eslint-disable react/prop-types */
import MovieListItem from "./MovieListItem"

function MovieList({movies, onSelectMovie}){
    return <ul className="list list-movies">
    {movies?.map((movie) => (
      <MovieListItem onSelectMovie={onSelectMovie} movie={movie} key={movie.imdbID}/>
    ))}
  </ul>
  }

  export default MovieList