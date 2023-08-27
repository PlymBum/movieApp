import React, { Component } from 'react'
import { Layout } from 'antd'
import { debounce } from 'lodash'

import MovieList from './MoviesList'
import MovieService from './API/MovieService'
import Search from './Search/Search'
import Header from './Header'
import './index.css'
import { GenreProvider } from './GenreContext'
import NotFoundPage from './NotFoundPage'

export default class App extends Component {
  movieService = new MovieService()

  searcheMovie = debounce(() => this.updateMovieList(), 3000)

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      onError: false,
      errorMessage: '',
      guestSessionId: '',
      searchedMovie: '',
      currentSearch: 'return',
      isRatedPage: false,
      items: [],
      currentPage: 1,
      totalPage: 1,
      ratedCurentPage: 1,
      ratedTotalPage: 1,
      genreList: [],
    }
  }

  componentDidMount() {
    if (localStorage.getItem('guestSessionId')) {
      this.setState({
        guestSessionId: localStorage.getItem('guestSessionId'),
      })
    } else {
      this.movieService.createGuestSession().then((id) => {
        localStorage.setItem('guestSessionId', id)
        this.setState({
          guestSessionId: id,
        })
      })
    }

    this.getGenreList()
    this.updateMovieList()
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentPage, isRatedPage, ratedCurrentPage, searchedMovie } = this.state
    if (prevState.currentPage !== currentPage || prevState.ratedCurrentPage !== ratedCurrentPage) {
      if (isRatedPage) {
        this.getRated()
      }
      if (!isRatedPage) {
        this.updateMovieList()
      }
    }
    if (prevState.isRatedPage !== isRatedPage) {
      if (isRatedPage) {
        this.getRated()
      }
      if (!isRatedPage) {
        this.updateMovieList()
      }
    }
    if (prevState.searchedMovie !== searchedMovie && searchedMovie !== '') {
      this.searcheMovie()
    }
  }

  onError = (error) => {
    this.setState({
      onError: true,
      isLoading: false,
      errorMessage: error.message,
    })
  }

  setSerchedMovie = (searchInput) => {
    this.setState({
      searchedMovie: searchInput,
      currentSearch: searchInput,
    })
  }

  setCurrentPage = (page) => {
    const { isRatedPage } = this.state
    if (isRatedPage) {
      this.setState({
        ratedCurrentPage: page,
      })
    }
    if (!isRatedPage) {
      this.setState({
        currentPage: page,
      })
    }
  }

  updateMovieList = () => {
    this.setState({
      isLoading: true,
    })

    const { currentSearch, currentPage } = this.state

    this.movieService
      .getByKeyword(currentSearch, currentPage)
      .then((body) => {
        this.setState({
          items: body.results,
          currentPage: body.page,
          totalPage: body.total_results,
          isLoading: false,
          onError: false,
          searchedMovie: '',
        })
      })
      .catch(this.onError)
  }

  getRated = () => {
    const { guestSessionId, ratedCurrentPage } = this.state

    this.movieService
      .getRatedMovies(guestSessionId, ratedCurrentPage)
      .then((body) => {
        this.setState({
          isLoading: false,
          onError: false,
          items: body.results,
          ratedTotalPage: body.total_results,
          ratedCurrentPage: body.page,
        })
      })
      .catch(this.onError)
  }

  toogleTabs = (bool) => {
    this.setState({
      isRatedPage: bool,
    })
  }

  getGenreList = () => {
    this.movieService.getGenreList().then((res) => {
      const genreArray = {}
      res.forEach((el) => {
        genreArray[el.id] = el.name
      })
      this.setState({
        genreList: { ...genreArray },
      })
    })
  }

  render() {
    const {
      isRatedPage,
      searchedMovie,
      isLoading,
      onError,
      errorMessage,
      guestSessionId,
      items,
      currentPage,
      totalPage,
      ratedCurentPage,
      ratedTotalPage,
      genreList,
    } = this.state
    const { setSerchedMovie, setCurrentPage, toogleTabs } = this
    const searchComponent = isRatedPage ? null : (
      <Search setSerchedMovie={setSerchedMovie} searchedMovie={searchedMovie} />
    )

    const paginationPage = isRatedPage ? ratedCurentPage : currentPage
    const paginationTotalPage = isRatedPage ? ratedTotalPage : totalPage

    const movieListComponent =
      items.length > 0 ? (
        <MovieList
          items={items}
          isLoading={isLoading}
          onError={onError}
          errorMessage={errorMessage}
          guestSessionId={guestSessionId}
          page={paginationPage}
          totalPage={paginationTotalPage}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <NotFoundPage />
      )
    return (
      <Layout>
        <Header toogleTabs={toogleTabs} />
        {searchComponent}
        <GenreProvider value={genreList}>{movieListComponent}</GenreProvider>
      </Layout>
    )
  }
}
