import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import { img_500, unavailable, unavailableLandscape } from '../../config/config';
import { Badge, Button } from '@material-ui/core';
import YouTubeIcon from "@material-ui/icons/YouTube"
import "./ContentModal.css"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function ContentModal(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${props.media_type}/${props.id}?api_key=6dabcff495f51dd56007af237e249fbd&language=en-US`
    );
    setContent(data);
    // console.log(data);
  };

    const fetchVideo = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${props.media_type}/${props.id}/videos?api_key=6dabcff495f51dd56007af237e249fbd&language=en-US`
        );
    
        setVideo(data.results[0]?.key);
      };
    
      useEffect(() => {
          fetchData();
          fetchVideo();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);

  return (
    <>
      <div className="media" style={{ cursor: "pointer" }} color="inherit">
        <Badge onClick={handleOpen} badgeContent="i" color="primary"></Badge>
        {props.children} {/* children is a keyword */}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
        {content && (
          <div className={classes.paper}>
            
            <div className='ContentModal'>
              <Badge onClick={handleClose} badgeContent="X" color="secondary"></Badge>
              <img 
              src={`${content.poster_path}` ? `${img_500}/${content.poster_path}`: `${unavailable}`} 
              className="ContentModal__portrait"
              alt={content.name || content.title}/>
              
              <img
              src={`${content.backdrop_path}` ? `${img_500}/${content.backdrop_path}` : `${unavailableLandscape}`} 
              alt={content.name || content.title} 
              className= "ContentModal__landscape" />

              <div
                className="ContentModal__about">
                <span className = "ContentModal__title">
                  {content.name || content.title} 
                  ({(content.first_air_date 
                    || content.release_date 
                    || "-----").substring(0,4)}) {/*extracting the year 0 to 4*/}
                </span>
                {content.tagline && (
                  <i className="tagline">{content.tagline}</i>
                )}
                <span className="ContentModal__description">
                  {content.overview}  
                </span>

                <div>
                <Button
                  variant="contained"
                  startIcon={<YouTubeIcon />}
                  color="secondary"
                  target="__blank"
                  href={`https://www.youtube.com/watch?v=${video}`}
                  >Watch the Trailer
                </Button>
                </div>

              </div>

            </div>

          </div>
        )}
        </Fade>
      </Modal>
    </>
  );
}
