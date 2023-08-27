import React, { Component } from 'react'
import { Input } from 'antd'
import './Search.css'

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  setSearchValue = (e) => {
    const { setSerchedMovie } = this.props
    setSerchedMovie(e.target.value)
  }

  render() {
    const { searchedMovie } = this.props
    const { setSearchValue } = this
    return (
      <Input
        className="search__input"
        placeholder="Введите название фильма для поиска..."
        value={searchedMovie}
        onChange={setSearchValue}
      />
    )
  }
}
