import axios from 'axios';
import "./Trending.css"
import React, { useEffect, useState } from 'react'
import SingleContent from '../../components/SingleContent/SingleContent';
import WhatshotIcon from '@material-ui/icons/Whatshot';


const Trending = () => {

  const [content, setContent] = useState([]);

  const fetchTrending = async() => {
    const{ data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=6dabcff495f51dd56007af237e249fbd`);

    console.log(data.results);

    setContent(data.results)
  }

  useEffect(() => {
    fetchTrending()
  },[])

  return (
    <div>
        <span className="pageTitle">{<WhatshotIcon />}Trending {<WhatshotIcon />}</span>
        <div className='trending'>
          {
            content && content.map((c) => <SingleContent 
            key={c.id} 
            id={c.id} 
            poster={c.poster_path} 
            title={c.title || c.name} 
            date={c.first_air_date || c.release_date}
            media_type={c.media_type}
            vote_average={c.vote_average}
            />
            )}
        </div>
    </div>
  )
}

export default Trending