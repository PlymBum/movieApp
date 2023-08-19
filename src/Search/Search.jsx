import React, { Component } from 'react'
import { Input } from 'antd'

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: '',
    }
  }

  setSearchValue = (e) => {
    console.log(e.target.value)
    this.setState({
      searchValue: e.target.value,
    })
  }

  render() {
    const { searchValue } = this.state
    const { setSearchValue } = this
    return <Input placeholder="Введите название фильма для поиска..." value={searchValue} onChange={setSearchValue} />
  }
}
