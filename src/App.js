import React from 'react'
import { Layout } from 'antd'

import MovieList from './MoviesList'

const { Header, Footer } = Layout

function App() {
  return (
    <Layout>
      <Header>header</Header>
      <MovieList />
      <Footer>footer</Footer>
    </Layout>
  )
}

export default App
