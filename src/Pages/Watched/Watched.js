import React, { useContext } from 'react'
import { GlobalContext } from '../../components/context/GlobalState'
import SingleContent from '../../components/SingleContent/SingleContent';

function Watched () {
  
  const {watched} = useContext(GlobalContext);
  
  return (
    <div>
      {watched.length > 0 ? (
      <div className="trending">
        {watched && watched.map((c) => <SingleContent 
        key={c.id}
        id={c.id}
        poster={c.poster}
        title={c.title || c.name}
        date={c.date}
        media_type="movie"
        vote_average={c.vote_average}
         /> )}
      </div>
      ) : (<h2>No movies in your list, add some!</h2>)
        }
    </div>
  )
}

export default Watched