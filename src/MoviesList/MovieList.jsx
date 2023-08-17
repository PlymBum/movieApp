import React, { Component } from 'react'
import { Layout, Spin } from 'antd'

import MovieItem from '../MovieItem'
import MovieService from '../API/MovieService'
import ErrorComponent from '../ErrorComponent'

import './MovieList.css'

const { Content } = Layout
export default class MovieList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      onError: false,
      items: [],
      errorMessage: '',
    }
  }

  componentDidMount() {
    const movieService = new MovieService()
    movieService
      .getByKeyword('return', 1)
      .then((res) => {
        this.setState({
          isLoading: false,
          onError: false,
          items: res,
        })
      })
      .catch(this.onError)
  }

  onError = (error) => {
    this.setState({
      onError: true,
      isLoading: false,
      errorMessage: error.message,
    })
  }

  render() {
    const { state } = this
    const { isLoading, onError, errorMessage } = state

    const itemLoaded = !(isLoading || onError)

    const spinComponent = isLoading ? <Spin className="main__spiner" size="large" /> : null

    const errorComponent = onError ? <ErrorComponent message={errorMessage} /> : null

    const filmsComponent = itemLoaded
      ? state.items.map((item) => {
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
      : null

    return (
      <Layout>
        <Content className="main__content">
          {spinComponent}
          {filmsComponent}
          {errorComponent}
        </Content>
      </Layout>
    )
  }
}
