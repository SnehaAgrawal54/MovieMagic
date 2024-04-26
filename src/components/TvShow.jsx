import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopNav from './templates/TopNav'
import Dropdown from './templates/Dropdown'
import axios from '../utils/axios'
import Cards from './templates/Cards'
import Loading from './Loading'
import InfiniteScroll from 'react-infinite-scroll-component';

const TvShow = () => {
    document.title = "MovieMagic | Tv Show";
    const navigate = useNavigate();
    const [category, setCategory] = useState("airing_today")
    const [tvShow, setTvShow] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    const getTvShow = async () => {
        try {
            const { data } = await axios.get(`/tv/${category}?page=${page}`)

            if (data.results.length > 0) {
                setTvShow((prevdata) => [...prevdata, ...data.results])
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
        if (tvShow.length === 0) {
            getTvShow()
        }
        else {
            setPage(1)
            setTvShow([])
            getTvShow()
        }
    }

    useEffect(() => {
        refreshHandler()
    }, [category])

    return tvShow.length > 0 ? (
        <div className='px-[3%] w-screen h-screen'>
            {/* tvShow topnav */}
            <div className='w-full flex items-center justify-between'>
                <h1 className='text-xl font-semibold text-zinc-400'>
                    <i
                        className='ri-arrow-left-line hover:text-[#6556CD]'
                        onClick={() => navigate(-1)}
                    ></i>
                    {"  "}
                    Tv Show <small className='ml-2 text-sm text-zinc-600'>
                    ({category})
                    </small>
                </h1>

                <div className='flex items-center w-[80%]'>
                    <TopNav />
                    <Dropdown
                        title="Category"
                        options={["on_the_air","popular", "top_rated","airing_today"]}
                        fnx={(e) => setCategory(e.target.value)}
                    />
                    <div className='w-[2%]'></div>
                </div>
            </div>
            {/* tvShow cards */}
            <InfiniteScroll
                dataLength={tvShow.length}
                next={getTvShow}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
            >
                <Cards data={tvShow} title="tv" />

            </InfiniteScroll>
        </div>
    ) : (
        <Loading />
    )
}

export default TvShow