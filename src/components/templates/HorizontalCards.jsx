import React from 'react'
import { Link } from 'react-router-dom'
import noimage from '/no-image.jpg'

const HorizontalCards = ({ data }) => {
  return (
    <div className='w-[100%] flex overflow-y-hidden mb-5 p-4'>
      {data.length>0 ? data.map((item, idx) => (
        <Link 
        to={`/${item.media_type}/details/${item.id}`} 
        key={idx} 
        className='min-w-[15%] h-[40vh] bg-zinc-800 mr-5 mb-5'>
          <img
            className='w-full h-[53%] object-cover'
            src={
              item.backdrop_path || item.poster_path ? `https://image.tmdb.org/t/p/original/${item.backdrop_path || item.poster_path}` : noimage
            }
            alt="" />
          <div className='text-white p-2 h-[47%]'>
            <h1 className='text-sm font-bold leading-5 mb-1 tracking-tight'>
              {item.title || item.original_title || item.name || item.original_name}
            </h1>
            <p className=' text-sm text-zinc-200 tracking-tight'>
              {item.overview.slice(0, 38)}...
              <span className='text-zinc-500'>more</span>
            </p>
          </div>
        </Link>
      )) : (
        <h1 className='mt-5 text-2xl text-white font-black text-center'>Nothing to Show</h1>
      )}
    </div>
  )
}

export default HorizontalCards