/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react"
import StarRating from "./Starrating"
import Loader from "./Loader"
import { useKey } from "../hooks/useKey"

const KEY = '84552b0e'

function MovieDetails({selectedId, onMovieClose, onAddWatched, watched}){
    const [movie, setMovie] = useState({})
    const [isloading, setIsLoading] = useState(false)
    const [userRating, setUserRating] = useState(0)
    const isWatched = watched.find(obj=>obj.imdbID==selectedId)

    const userRef = useRef(0)

    useEffect(()=>{
      if(userRating) userRef.current = userRef.current + 1
    },[userRating])
  
    const {
      Title: title,
      Year: year,
      Poster: poster,
      Runtime: runtime,
      Plot: plot,
      Released: released,
      Actors: actors,
      Director: director,
      Genre: genre,
      imdbRating,
    } = movie
  
    useKey('Escape', onMovieClose)
  
    useEffect(()=>{
      async function getMovie(){
        setIsLoading(true)
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
        const data = await res.json()
        setMovie(data)
        setIsLoading(false)
      }
      getMovie()
    },[selectedId])
  
    useEffect(()=>{
      if(!title) return;
      document.title = `Movie | ${title}`
      return function(){
        document.title = 'usepopcorn'
      }
    },[title])
  
    function handleOnAddWatched(){
      const newWatchedMovie = {
        imdbID: selectedId,
        userRating,
        title,
        year,
        poster,
        imdbRating: Number(imdbRating),
        runtime: Number(runtime.split(' ')[0]),
        userDecision: userRef.current
      }
      onAddWatched(newWatchedMovie)
      onMovieClose()
    }
  
    return <div className="details">
      {isloading?<Loader/>:<>
      <header>
        <button onClick={onMovieClose} className="btn-back">&larr;</button>
        <img src={poster} alt={`Poster of ${movie} Movie`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p><span>⭐</span>{imdbRating} IMDb rating</p>
        </div>
      </header>
      <section>
        
        <div className="rating">
          {!isWatched ? <>
          <StarRating maxStar={10} size={24} onSetRating={setUserRating}/>
          {userRating>0 && <button onClick={handleOnAddWatched} className="btn-add">+ Add to list</button>}
          </>:<p>You rated this movie {isWatched?.userRating} ⭐</p>}
        </div> 
        <p><em>{plot}</em></p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
      </>}
      
      </div>
  }

  export default MovieDetails