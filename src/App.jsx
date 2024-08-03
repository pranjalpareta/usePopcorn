import { useState } from "react";
import NavBar from "./components/NavBar";
import Logo from "./components/Logo";
import Search from "./components/Search";
import MainPage from "./components/MainPage";
import Box from "./components/Box";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";
import WatchedSummary from "./components/WatchedSummary";
import WatchedList from "./components/WatchedList";
import NumResults from "./components/NumResults";
import MovieList from "./components/MovieList";
import Loader from "./components/Loader";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

export default function App() {
  const [selectedId, setSeletedId] = useState(null)
  const [query, setQuery] = useState("");
  const {movies, isLoading, error} = useMovies(query,handleMovieClose)
  
  const [watched, setWatched] = useLocalStorageState([],'watched')

  function handleSelectedMovie(imdbId){
    setSeletedId(prevId=>(prevId===imdbId ? null : imdbId))
  }

  function handleMovieClose(){
    setSeletedId(null)
  }

  function handleAddWatched(movie){
    setWatched(prev=>[...prev, movie])
  }

  function handleDeleteWatched(id){
    setWatched(watched=>watched.filter(obj=>obj.imdbID!==id))
  }

  return (
    <>
      <NavBar>
        <Logo/>
        <Search query={query} setQuery={setQuery}/>
        <NumResults movies={movies}/>
      </NavBar>
      <MainPage>
        <Box>
          {/* {isLoading ? <Loader/> : <MovieList movies={movies}/>} */}
          {isLoading && <Loader/>}
          {!isLoading && !error && <MovieList onSelectMovie={handleSelectedMovie} movies={movies}/>}
          {error && <ErrorMessage message={error}/>}
        </Box>
        <Box>
          {
          selectedId ? <MovieDetails watched={watched} onAddWatched={handleAddWatched} onMovieClose={handleMovieClose} selectedId={selectedId}/> : 
          <>
          <WatchedSummary watched={watched}/>
          <WatchedList watched={watched} onDeleteWatched={handleDeleteWatched}/>
          </>
          }
        </Box>
      </MainPage>
    </>
  );
}