import React, { Component } from 'react'
import { Rate } from 'antd'

import MovieService from '../API/MovieService'

export default class MovieRate extends Component {
  constructor(props) {
    super(props)
    const { rating } = this.props
    this.state = {
      filmRate: rating,
    }
  }

  onChange = (e) => {
    const { id, guestSessionId } = this.props
    const { filmRate } = this.state
    const movieService = new MovieService()
    if (e === filmRate) return
    this.setState({
      filmRate: e,
    })
    movieService.setMovieRate(id, guestSessionId, e)
    localStorage.setItem(id, e)
  }

  render() {
    const { filmRate } = this.state
    const { onChange } = this
    return (
      <div className="rate">
        <Rate
          allowHalf
          defaultValue={filmRate}
          count={10}
          style={{ fontSize: 12 }}
          onChange={onChange}
          allowClear={false}
        />
      </div>
    )
  }
}
