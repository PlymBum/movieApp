/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Space, Tag, Rate } from 'antd'
import format from 'date-fns/format'

import MovieRate from '../MovieRate'

import posterDefault from './posterDefault.jpg'

import './MovieItem.css'

function MovieItem({
  title,
  date,
  description,
  posterPath,
  id,
  guestSessionId,
  rating,
  voteAverage,
  genreList,
  genreIds,
}) {
  const posterUrl = 'https://image.tmdb.org/t/p/original'
  const trimStr = (str) => {
    if (str.length < 140) return str

    const newStr = str.slice(0, 140)
    for (let i = newStr.length - 1; i > 0; i--) {
      if (newStr[i] === ' ') {
        return `${newStr.slice(0, i)}...`
      }
    }
    return `${newStr}...`
  }
  const dateFormat = (str) => {
    if (!Number.isNaN(Date.parse(str))) {
      return format(new Date(str), 'PP')
    }
    return 'no data'
  }
  const defaultPoster = (e) => {
    e.target.onError = null
    e.target.src = posterDefault
  }

  const checkRate = (filmId) => {
    return +localStorage.getItem(filmId) || 0
  }
  const voteAverageColor = (str) => {
    const vote = +str
    if (vote > 7) return '#66E900'
    if (vote > 5) return '#E9D100'
    if (vote > 3) return '#E97E00'
    if (vote > 0) return '#E90000'
    return '#aaa'
  }

  const averageRateStyle = { border: `2px solid ${voteAverageColor(voteAverage)}` }

  const tagsList =
    genreIds.length === 0 ? (
      <Tag>no data</Tag>
    ) : (
      genreIds.slice(0, 2).map((genreId) => {
        return <Tag key={genreId}>{genreList[genreId]}</Tag>
      })
    )

  return (
    <Card className="movie__item">
      <img className="movie__poster" src={posterUrl + posterPath} alt="posterFilm" onError={defaultPoster} />
      {/* <img className="movie__poster" src={posterDefault} alt="posterFilm" /> This dev  */}
      <div className="movie__info">
        <div className="movie__header">
          <h2 className="movie__title">{title}</h2>
          <span className="movie__averageRate" style={averageRateStyle}>
            {voteAverage.toFixed(1)}
          </span>
        </div>
        <span className="movie__release-date">{dateFormat(date)}</span>
        <div className="movie__tags">
          <Space size={[0, 8]} wrap>
            {tagsList}
          </Space>
        </div>
        <div className="movie__description">{trimStr(description)}</div>
        <MovieRate className="rate" id={id} guestSessionId={guestSessionId} rating={checkRate(id)} />
      </div>
    </Card>
  )
}

export default MovieItem
