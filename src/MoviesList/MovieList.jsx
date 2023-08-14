import React, { Component } from 'react'
import { Layout } from 'antd'

import MovieItem from '../MovieItem'
import MovieService from '../API/MovieService'

import './MovieList.css'

const { Content } = Layout
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
      this.setState({
        items: res,
      })
    })
  }

  render() {
    const { state } = this
    return (
      <Layout>
        <Content className="main__content">
          {state.items.map((item) => {
            return (
              <MovieItem
                key={item.id}
                img={item.poster_path}
                title={item.title}
                date={item.release_date}
                description={item.overview}
              />
            )
          })}
        </Content>
      </Layout>
    )
  }
}
