import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopNav from './templates/TopNav'
import Dropdown from './templates/Dropdown'
import axios from '../utils/axios'
import Cards from './templates/Cards'
import Loading from './Loading'
import InfiniteScroll from 'react-infinite-scroll-component';

const Trending = () => {
  document.title = "MovieMagic | Trending";
  const navigate = useNavigate();
  const [category, setCategory] = useState("all")
  const [duration, setDuration] = useState("day")
  const [trending, setTrending] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)


  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`)

      if (data.results.length > 0) {
        setTrending((prevdata) => [...prevdata, ...data.results])
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
    if (trending.length === 0) {
      getTrending()
    }
    else {
      setPage(1)
      setTrending([])
      getTrending()
    }
  }

  useEffect(() => {
    refreshHandler()
  }, [category, duration])

  return trending.length > 0 ? (
    <div className='px-[3%] w-screen h-screen'>
      {/* trending topnav */}
      <div className='w-full flex items-center justify-between'>
        <h1 className='text-xl font-semibold text-zinc-400'>
          <i
            className='ri-arrow-left-line hover:text-[#6556CD]'
            onClick={() => navigate(-1)}
          ></i>
          {"  "}
          Trending
        </h1>

        <div className='flex items-center w-[80%]'>
          <TopNav />
          <Dropdown
            title="Category"
            options={["movie", "tv", "all"]}
            fnx={(e) => setCategory(e.target.value)}
          />
          <div className='w-[2%]'></div>
          <Dropdown
            title="Duration"
            options={["week", "day"]}
            fnx={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>
      {/* trending cards */}
      <InfiniteScroll
        dataLength={trending.length}
        next={getTrending}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <Cards data={trending} title={category} />

      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  )
}

export default Trending