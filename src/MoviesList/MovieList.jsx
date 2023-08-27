import React from 'react'
import { Layout } from 'antd'
import { Offline, Online } from 'react-detect-offline'

import MovieItem from '../MovieItem'
import ErrorComponent from '../ErrorComponent'
import PaginationComponent from '../Pagination'
import './MovieList.css'
import OflineCoponent from '../OflineComponent'
import Spiner from '../Spiner'
import { GenreConsumer } from '../GenreContext'

const { Content } = Layout
function MovieList({ isLoading, onError, errorMessage, items, guestSessionId, page, totalPage, setCurrentPage }) {
  const polling = {
    enabled: true,
    interval: 5000,
    timeout: 55555000,
    url: '8.8.8.8',
  }

  const itemLoaded = !(isLoading || onError)

  const spinComponent = isLoading ? <Spiner /> : null

  const errorComponent = onError ? <ErrorComponent message={errorMessage} /> : null
  const filmsComponent = itemLoaded
    ? items.map((item) => {
        return (
          <GenreConsumer key={item.id}>
            {(genreList) => {
              return (
                <MovieItem
                  img={item.poster_path}
                  title={item.title}
                  date={item.release_date}
                  description={item.overview}
                  posterPath={item.poster_path}
                  id={item.id}
                  guestSessionId={guestSessionId}
                  rating={item.rating}
                  voteAverage={item.vote_average}
                  genreList={genreList}
                  genreIds={item.genre_ids}
                />
              )
            }}
          </GenreConsumer>
        )
      })
    : null
  return (
    <Layout>
      <Online className="wrapper" polling={polling}>
        <Content className="main__content">
          {spinComponent}
          {spinComponent}
          {filmsComponent}
          {errorComponent}
        </Content>
        <PaginationComponent currentPage={page} totalPage={totalPage} setCurrentPage={setCurrentPage} />
      </Online>
      <Offline polling={polling}>
        <OflineCoponent />
      </Offline>
    </Layout>
  )
}
export default MovieList
