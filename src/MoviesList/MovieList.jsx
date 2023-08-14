import React, { Component } from 'react'

import MovieItem from '../MovieItem'
import MovieService from '../API/MovieService'

export default class MovieList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
    }
  }

  componentDidMount() {
    const movieService = new MovieService()
    movieService.getByKeyword('return').then((res) => {
      this.setState(({ items }) => {
        return {
          items: [...items, ...res],
        }
      })
    })
  }

  render() {
    const { state } = this

    return state.items.map((item) => {
      return (
        <MovieItem
          key={item.id}
          img={item.poster_path}
          title={item.title}
          date={item.release_date}
          description={item.overview}
        />
      )
    })
  }
}