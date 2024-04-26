import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopNav from './templates/TopNav'
import Dropdown from './templates/Dropdown'
import axios from '../utils/axios'
import Cards from './templates/Cards'
import Loading from './Loading'
import InfiniteScroll from 'react-infinite-scroll-component';

const Popular = () => {
    document.title = "MovieMagic | Popular";
    const navigate = useNavigate();
    const [category, setCategory] = useState("movie")
    const [popular, setPopular] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    const getPopular = async () => {
        try {
            const { data } = await axios.get(`${category}/popular?page=${page}`)

            if (data.results.length > 0) {
                setPopular((prevdata) => [...prevdata, ...data.results])
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
        if (popular.length === 0) {
            getPopular()
        }
        else {
            setPage(1)
            setPopular([])
            getPopular()
        }
    }

    useEffect(() => {
        refreshHandler()
    }, [category])

    return popular.length > 0 ? (
        <div className='px-[3%] w-screen h-screen'>
            {/* popular topnav */}
            <div className='w-full flex items-center justify-between'>
                <h1 className='text-xl font-semibold text-zinc-400'>
                    <i
                        className='ri-arrow-left-line hover:text-[#6556CD]'
                        onClick={() => navigate(-1)}
                    ></i>
                    {"  "}
                    Popular
                </h1>

                <div className='flex items-center w-[80%]'>
                    <TopNav />
                    <Dropdown
                        title="Category"
                        options={["tv", "movie"]}
                        fnx={(e) => setCategory(e.target.value)}
                    />
                    <div className='w-[2%]'></div>
                </div>
            </div>
            {/* popular cards */}
            <InfiniteScroll
                dataLength={popular.length}
                next={getPopular}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
            >
                <Cards data={popular} title={category} />

            </InfiniteScroll>
        </div>
    ) : (
        <Loading />
    )
}

export default Popular