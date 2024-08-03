/* eslint-disable react/prop-types */
import WatchListItem from "./WatchListItem"

function WatchedList({watched, onDeleteWatched}){
    return <ul className="list">
    {watched.map((movie) => (
      <WatchListItem onDeleteWatched={onDeleteWatched} key={movie.imdbID} movie={movie}/>
    ))}
  </ul>
  }

  export default WatchedList