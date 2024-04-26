import React from 'react'
import { Link } from 'react-router-dom'

const SideNav = () => {
    return (
        <div className='w-[20%] h-full p-8 border-r-2 border-zinc-400'>
            <h1 className='text-lg text-white font-bold'>
                <i className="ri-camera-lens-fill text-[#6556CD] mr-2 text-xl"></i>
                <span>MovieMagic</span>
            </h1>
            <nav className='flex flex-col text-zinc-400 text-base gap-3 mb-2'>
                <h1 className='text-white font-semibold mt-8'>
                    New Feeds
                </h1>
                <Link to="/trending" className="p-3 rounded-lg hover:bg-[#6556CD] hover:text-white duration-300">
                    <i className="ri-fire-fill mr-2"></i>
                    Trending
                </Link>
                <Link to="/popular"
                className="p-3 rounded-lg hover:bg-[#6556CD] hover:text-white duration-300">
                    <i className="ri-bard-fill mr-2"></i>
                    Popular
                </Link>
                <Link to="/movie" className="p-3 rounded-lg hover:bg-[#6556CD] hover:text-white duration-300">
                    <i className="ri-movie-2-fill mr-2"></i>
                    Movies
                </Link>
                <Link to="/tvShow" className="p-3 rounded-lg hover:bg-[#6556CD] hover:text-white duration-300">
                    <i className="ri-tv-2-fill mr-2"></i>
                    Tv Shows
                </Link>
                <Link to="/people" className="p-3 rounded-lg hover:bg-[#6556CD] hover:text-white duration-300">
                    <i className="ri-team-fill mr-2"></i>
                    People
                </Link>
            </nav>

            <hr className='border-none h-[1px] bg-zinc-400' />

            <nav className='flex flex-col text-zinc-400 text-base gap-3'>
                <h1 className='text-white font-semibold mt-8'>
                    Website Information
                </h1>
                <Link to="/aboutUs" className="p-3 rounded-lg hover:bg-[#6556CD] hover:text-white duration-300">
                    <i className="ri-information-fill mr-2"></i>
                    About MovieMagic
                </Link>
                <Link to="/contactUs" className="p-3 rounded-lg hover:bg-[#6556CD] hover:text-white duration-300">
                    <i className="ri-phone-fill mr-2"></i>
                    Contact Us
                </Link>
            </nav>
        </div>
    )
}

export default SideNav