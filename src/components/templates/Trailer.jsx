import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import NotFound from '../NotFound'

const Trailer = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const category = pathname.includes("movie") ? "movie" : "tv"
  const ytvideo = useSelector((state) => state[category].info.videos)

  return (
    <div className='w-screen h-screen flex items-center justify-center fixed top-0 left-0 z-20 bg-[rgba(0,0,0,.9)] '>
      <Link
        className='ri-close-fill hover:text-[#6556CD] text-3xl text-white absolute right-[5%] top-[5%]'
        onClick={() => navigate(-1)}
      ></Link>

      {ytvideo ? (
        <ReactPlayer
          controls
          height={600}
          width={1067}
          url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
        />
      ) : (
        <NotFound />
      )
      }
    </div>
  )
}

export default Trailer 