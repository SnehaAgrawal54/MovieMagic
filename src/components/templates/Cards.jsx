import React from 'react'
import { Link } from 'react-router-dom'
import noimage from '/no-image.jpg'

const Cards = ({ data, title }) => {
    return (
        <div className='w-full px-[3%] flex flex-wrap bg-[#1F1E24] justify-between '>
            {data.map((item, idx) => (
                <Link
                    to={`/${item.media_type || title}/details/${item.id}`}
                    key={idx}
                    className='w-[25vh] mr-[5%] mb-[5%] relative'>
                    <img
                        className='h-[40vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]'
                        src={
                            item.poster_path || item.backdrop_path || item.profile_path ? 
                            `https://image.tmdb.org/t/p/original/${item.poster_path || item.backdrop_path || item.profile_path}` : noimage
                        }
                        alt="" />
                    <h1 className='text-lg text-zinc-300 mt-3 font-bold'>
                        {item.title || item.original_title || item.name || item.original_name}
                    </h1>

                    {item.vote_average && (
                        <div className='w-[6vh] h-[6vh] rounded-full text-lg text-white font-semibold bg-yellow-600 flex justify-center items-center absolute right-[-10%] top-[55%]'>
                            {(item.vote_average * 10).toFixed()}
                            <sup>%</sup>
                        </div>
                    )}

                </Link>
            ))}
        </div>
    )
}

export default Cards