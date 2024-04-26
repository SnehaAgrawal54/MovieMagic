import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopNav from './templates/TopNav'
import Dropdown from './templates/Dropdown'
import axios from '../utils/axios'
import Cards from './templates/Cards'
import Loading from './Loading'
import InfiniteScroll from 'react-infinite-scroll-component';

const Movie = () => {
    document.title = "MovieMagic | Movie";
    const navigate = useNavigate();
    const [category, setCategory] = useState("now_playing")
    const [movie, setMovie] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)


    const getMovie = async () => {
        try {
            const { data } = await axios.get(`/movie/${category}?page=${page}`)

            if (data.results.length > 0) {
                setMovie((prevdata) => [...prevdata, ...data.results])
                setPage(page + 1)
            }
            else {
                setHasMore(false)
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }

    const refreshHandler = () => {
        if (movie.length === 0) {
            getMovie()
        }
        else {
            setPage(1)
            setMovie([])
            getMovie()
        }
    }

    useEffect(() => {
        refreshHandler()
    }, [category])

    return movie.length > 0 ? (
        <div className='px-[3%] w-screen h-screen'>
            {/* movie topnav */}
            <div className='w-full flex items-center justify-between'>
                <h1 className='text-xl font-semibold text-zinc-400'>
                    <i
                        className='ri-arrow-left-line hover:text-[#6556CD]'
                        onClick={() => navigate(-1)}
                    ></i>
                    {"  "}
                    Movie <small className='ml-2 text-sm text-zinc-600'>
                    ({category})
                    </small>
                </h1>

                <div className='flex items-center w-[80%]'>
                    <TopNav />
                    <Dropdown
                        title="Category"
                        options={["popular", "upcoming","top_rated","now_playing"]}
                        fnx={(e) => setCategory(e.target.value)}
                    />
                    <div className='w-[2%]'></div>
                </div>
            </div>
            {/* movie cards */}
            <InfiniteScroll
                dataLength={movie.length}
                next={getMovie}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
            >
                <Cards data={movie} title="movie" />

            </InfiniteScroll>
        </div>
    ) : (
        <Loading />
    )
}

export default Movie