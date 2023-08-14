class MovieService {
  _apiBase = 'https://api.themoviedb.org/3/'

  _getOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjIyMTZmYzE3OTczNjVhODVmOWIwMDM4YTcxMmVmOSIsInN1YiI6IjY0ZDM3ZmViYjZjMjY0MTE1NWVmMGFmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fyiVYv8ZHQjVRAaEh0OH2DLv1OJVLsisIAIDJQ1OdI0',
    },
  }

  getResource = async (url) => {
    const responce = await fetch(this._apiBase + url, this._getOptions)
    const body = await responce.json()
    return body.results
  }

  async getByKeyword(keyword) {
    return this.getResource(`search/movie?query=${keyword}&language=en-US&page=1`)
  }

  getMovie(id) {
    return this.getResource(`movie/${id}`)
  }
}

export default MovieService
