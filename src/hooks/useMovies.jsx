import { useEffect, useState } from "react";

const KEY = '84552b0e'

export function useMovies(query, callback){
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [error,setError] = useState('')
    useEffect(()=>{
        callback?.() // function optional chaining
        const controller = new AbortController()
        async function fetchMovies(){
          try {
            setIsLoading(true)
            setError('')
            const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,{signal: controller.signal});
            if(!res.ok) throw new Error('failed to featch data')
            const data = await res.json()
            if(data.Response === "False") throw new Error("Movie not found")
            setMovies(data.Search)
          } catch(err){
            if(err.name !== "AbortError"){
              setError(err.message)
            }
          } finally {
            setIsLoading(false)
          }
        }
        if(query.length < 3){
          setMovies([])
          setError([])
          return;
        }
        
        fetchMovies();
        return function(){
          controller.abort()
        }
      },[query])
      return {movies, isLoading, error}
}