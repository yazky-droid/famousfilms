const API_KEY = "YOURAPIKEY"
const BASE_URL = "https://api.themoviedb.org/3"

export const getPopularMovies = async (page) => {
    const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${encodeURIComponent(page)}`)
    const data = await response.json()

    return data.results
}

export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
    const data = await response.json()

    return data.results
}
