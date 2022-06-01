import './App.css';
import {useState,useEffect} from 'react';

function App() {
  let[movieInfo,SetmovieInfo]=useState(null);
  let[title,settitle]=useState("john wick")
  useEffect(()=>{
    
    getmovie();
  },[])

  function readtitle(value){
    settitle(value);
    console.log(value);
  }

  function getmovie(){
    fetch(`https://www.omdbapi.com/?t=${title}&apikey=da54522c`)
    .then((response)=>response.json())
    .then((movie)=>{
      SetmovieInfo(movie);
      console.log(movie);
      })
    .catch((err)=>console.log(err))

  }
  

  return (
    
    <div className="App">
      <div className="container">
        <div className="title">
          <h2>Search Movies</h2>
        </div>
        <div className="search-bar">
          
          <input type="text" placeholder="Movie Name..." onChange={(event)=>{readtitle(event.target.value)}} className="input-field"></input>
          <button className="search-btn" onClick={getmovie}>Search</button>
        </div>
        {
          movieInfo?.Error===undefined?(
        
        <div className="moviedetails">
          <div className="poster">
            <img src={movieInfo?.Poster}  className="img-poster"/>
          </div>
          <div className="details">
            <div>
              <h1>{movieInfo?.Title}</h1>
              <p><strong>Genre: </strong>{movieInfo?.Genre}</p>
              <p><strong>Plot: </strong>{movieInfo?.Plot}</p>
              <p><strong>Director: </strong>{movieInfo?.Director}</p>
              <p><strong>Actors: </strong>{movieInfo?.Actors}</p>
              <p><strong>BoxOffice: </strong>{movieInfo?.BoxOffice}</p>
              <p><strong>Languages: </strong>{movieInfo?.Language}</p>
              <p><strong>Runtime: </strong>{movieInfo?.Runtime}</p>
              <p><strong>Released Year: </strong>{movieInfo?.Year}</p>
            </div>
            <div className="rating">
              
              {
                  movieInfo?.Ratings.map((ratings,index)=>(
                    <div key={index}>
                      <strong>{ratings.Source}</strong>
                      <h4>{ratings.Value}</h4>
                    </div>
                 ))
              }
            </div>
          </div>
        </div>
        ):
        (
          <h1>Movie Not Found</h1>
        )
        }
      </div>
    </div>
  );
}

export default App;
