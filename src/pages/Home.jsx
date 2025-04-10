import '../css/Home.css'
import { useState, useEffect } from "react"
import MovieCard from "../components/MovieCard"
import { getPopularMovies, searchMovies } from '../assets/api'

function Home() {
    const [searchQuery, setSearchQuery] = useState("")
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies(page)
                setMovies(popularMovies)
            } catch (err) {
                console.log(err)
                setError("Failed to load movies...")
            }
            finally {
                setLoading(false)
            }
        }

        loadPopularMovies()
    }, [page])
 
    const handleSearch = async (e) => {
        e.preventDefault()
        if(!searchQuery.trim()) return
        if(loading) return

        try{
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch(err) {
            console.log(err)
            setError("Failed to search movies...")
        } finally {
            setLoading(false)
        }
    }

    const nextPage = () => {
        setPage(page+1)
    }

    return (
        <div className="home">
            <h2 className='search-form'>Top Rated Must Watch Movies</h2>
            <form onSubmit={handleSearch} className="search-form">
                <input type="text" placeholder="Search for movies..." value={searchQuery} onChange={ (e) => setSearchQuery(e.target.value) } className="search-input" />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className='error-message'>{error}</div>}

            {loading ? (
                <div className='loading'>Loading...</div>
            ) : (
                <>
                    <div className="movies-grid">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                    </div>
                    <div className='d-flex-center'>
                        <button onClick={nextPage} className='search-button'>Next Page</button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Home