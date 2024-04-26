import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ data }) => {

    return (
        <div className='w-full h-[50vh] flex flex-col justify-end items-start p-[5%] text-white'
            style={{
                background: `linear-gradient(rgba(0,0,0,.2 ),rgba(0,0,0,.5),rgba(0,0,0,.8)), 
                            url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path})`,
                backgroundPosition: "top 10%",
                backgroundSize: "cover"
            }}
        >
            <h1 className='w-[70%] text-3xl font-black'>
                {data.title || data.original_title || data.name || data.original_name}
            </h1>
            <p className='w-[70%] my-2 tracking-wide'>
                {data.overview.slice(0, 220)}...
                <Link
                    to={`/${data.media_type}/details/${data.id}`}
                    className='text-blue-400'>more</Link>
            </p>
            <p>
                <i className="ri-megaphone-fill text-yellow-500 mr-1"></i>{data.release_date || "No Information"}
                <i className="ri-album-fill text-yellow-500 ml-4 mr-1"></i>{data.media_type.toUpperCase()}
            </p>
            <Link
                to={`/${data.media_type}/details/${data.id}/trailer`}
                className='bg-[#6556CD] p-3 mt-4 rounded font-medium'>
                Watch Trailer
            </Link>
        </div>
    )
}

export default Header