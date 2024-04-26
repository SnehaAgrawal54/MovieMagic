import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopNav from './templates/TopNav'
import axios from '../utils/axios'
import Cards from './templates/Cards'
import Loading from './Loading'
import InfiniteScroll from 'react-infinite-scroll-component';

const People = () => {
    document.title = "MovieMagic | People";
    const navigate = useNavigate();
    const [category, setCategory] = useState("popular")
    const [people, setPeople] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    const getPeople = async () => {
        try {
            const { data } = await axios.get(`/person/${category}?page=${page}`)

            if (data.results.length > 0) {
                setPeople((prevdata) => [...prevdata, ...data.results])
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
        if (people.length === 0) {
            getPeople()
        }
        else {
            setPage(1)
            setPeople([])
            getPeople()
        }
    }

    useEffect(() => {
        refreshHandler()
    }, [category])

    return people.length > 0 ? (
        <div className='px-[3%] w-screen h-screen'>
            {/* people topnav */}
            <div className='w-full flex items-center justify-between'>
                <h1 className='text-xl font-semibold text-zinc-400'>
                    <i
                        className='ri-arrow-left-line hover:text-[#6556CD]'
                        onClick={() => navigate(-1)}
                    ></i>
                    {"  "}
                    People
                </h1>

                <div className='flex items-center w-[80%]'>
                    <TopNav />

                    <div className='w-[2%]'></div>
                </div>
            </div>
            {/* people cards */}
            <InfiniteScroll
                dataLength={people.length}
                next={getPeople}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
            >
                <Cards data={people} title="person" />

            </InfiniteScroll>
        </div>
    ) : (
        <Loading />
    )
}

export default People