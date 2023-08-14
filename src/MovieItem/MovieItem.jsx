import React from 'react'
import { Card, Space, Tag } from 'antd'
import format from 'date-fns/format'

import posterDefault from './posterDefault.svg'

import './MovieItem.css'

function MovieItem({ title, date, description }) {
  const trimStr = (str) => {
    if (str.length < 187) return str

    const newStr = str.slice(0, 187)
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

  return (
    <Card className="movie__item" style={{ width: 450 }}>
      <img className="movie__poster" src={posterDefault} alt="posterFilm" />
      <div className="movie__info">
        <h2 className="movie__title">{title}</h2>
        <span className="movie__release-date">{dateFormat(date)}</span>
        <div className="movie__tags">
          <Space size={[0, 8]} wrap>
            <Tag>Action</Tag>
            <Tag>Drama</Tag>
          </Space>
        </div>
        <div className="movie__description">{trimStr(description)}</div>
      </div>
    </Card>
  )
}

export default MovieItem
