import axios from '../../utils/axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import noimage from "/no-image.jpg"

const TopNav = () => {
    const [query, setQuery] = useState("")
    const [searches, setSearches] = useState([])

    const getSearches = async () => {
        try {
            const { data } = await axios.get(`/search/multi?query=${query}`)
            setSearches(data.results)
        } catch (error) {
            console.log("Error: ", error)
        }
    }

    useEffect(() => {
        getSearches()
    }, [query])

    return (
        <div className='w-[80%] h-[10vh] mx-auto relative flex items-center'>
            <i className="ri-search-line text-zinc-400 text-xl"></i>
            <input
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                className='w-[50%] mx-8 p-3 text-base text-zinc-200  outline-none border-none bg-transparent'
                type="text"
                placeholder='Search anything...' />
            {query.length > 0 && query.trim() && (
                <i
                    className="ri-close-fill  text-zinc-400 text-xl right-0"
                    onClick={() => setQuery("")}
                ></i>
            )}

            <div className='absolute w-[50%] max-h-[50vh] top-[100%] left-[5%] bg-zinc-200 overflow-auto z-[100]'>
                {
                    searches.map((item, idx) => (
                        <Link
                            to={`/${item.media_type}/details/${item.id}`}
                            key={idx}
                            className='w-[100%] p-8 flex justify-start items-center border-b-2 border-zinc-100 text-zinc-600 font-medium hover:text-black hover:bg-zinc-300 decoration-blue-300'>
                            <img
                                className='w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg'
                                src={item.backdrop_path || item.profile_path ? `https://image.tmdb.org/t/p/original/${item.backdrop_path || item.profile_path}` : noimage}
                                alt="" />
                            <span>{item.title || item.original_title || item.name || item.original_name}</span>
                        </Link>
                    ))
                }

            </div>
        </div>
    )
}

export default TopNav