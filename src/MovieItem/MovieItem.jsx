import React from 'react'

function MovieItem({ img, title, date, description }) {
  return (
    <div className="movie__item">
      <img className="movie__poster" src={`https://image.tmdb.org/t/p/w92${img}`} alt="posterFilm" />
      <div className="movie__info">
        <h2 className="movie__title">{title}</h2>
        <span className="movie__releae-date">{date}</span>
        <div className="movie__tags" />
        <div className="movie__description">{description}</div>
      </div>
    </div>
  )
}

export default MovieItem
