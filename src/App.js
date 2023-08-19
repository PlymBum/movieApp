import React, { Component } from 'react'
import { Layout } from 'antd'

import MovieList from './MoviesList'
import MovieService from './API/MovieService'
import Search from './Search/Search'

const { Header, Footer } = Layout

export default class App extends Component {
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
    const { isLoading, onError, errorMessage, items } = this.state
    return (
      <Layout>
        <Header>header</Header>
        <Search />
        <MovieList items={items} isLoading={isLoading} onError={onError} errorMessage={errorMessage} />
        <Footer>footer</Footer>
      </Layout>
    )
  }
}
