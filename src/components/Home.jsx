import React, { useEffect, useState } from 'react'
import TopNav from './templates/TopNav';
import SideNav from './templates/SideNav';
import Header from './templates/Header';
import axios from '../utils/axios';
import HorizontalCards from './templates/HorizontalCards';
import Dropdown from './templates/Dropdown';
import Loading from './Loading';

const Home = () => {
    document.title = "MovieMagic | Homepage";

    const [wallpaper, setWallpaper] = useState(null)
    const [trending, setTrending] = useState(null)
    const [category, setCategory] = useState("all")

    const getHeaderWallpaper = async () => {
        try {
            const { data } = await axios.get(`/trending/all/day`)
            let randomDataResult = data.results[(Math.random() * data.results.length).toFixed()]
            setWallpaper(randomDataResult)
        } catch (error) {
            console.log("Error: ", error)
        }
    }

    const getTrending = async () => {
        try {
            const { data } = await axios.get(`/trending/${category}/day`)
            setTrending(data.results)
        } catch (error) {
            console.log("Error: ", error)
        }
    }

    useEffect(() => {
        !wallpaper && getHeaderWallpaper();
        getTrending();
    }, [category])

    return wallpaper && trending ? (
        <>
            <SideNav />
            <div className='w-[80%] h-full overflow-auto overflow-x-hidden'>
                <TopNav />
                <Header data={wallpaper} />

                <div className='p-5 flex justify-between items-center'>
                    <h1 className='text-xl font-semibold text-zinc-400'>
                        Trending
                    </h1>
                    <Dropdown title="Filter" options={["tv", "movie", "all"]} fnx={(e) => setCategory(e.target.value)} />
                </div>

                <HorizontalCards data={trending} />
            </div>
        </>
    ) : (
        <Loading />
    )
}

export default Home