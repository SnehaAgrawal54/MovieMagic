import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { removeperson } from '../store/reducers/personSlice'
import { asyncloadperson } from '../store/actions/personActions'
import Loading from './Loading'
import HorizontalCards from './templates/HorizontalCards'
import Dropdown from './templates/Dropdown'
import noimage from '../../public/no-image.jpg'

const PersonDetails = () => {
  const { id } = useParams()
  const { info } = useSelector(state => state.person)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [category, setCategory] = useState("movie")

  useEffect(() => {
    dispatch(asyncloadperson(id))
    return () => {
      dispatch(removeperson())
    }
  }, [id])


  return info ? (
    <div
      className='w-screen px-[10%] h-[180vh]'>

      {/* Main part 1 navbar */}
      <nav className='w-full h-[10vh] text-zinc-100 text-xl flex items-center gap-10'>
        <Link
          className='ri-arrow-left-line hover:text-[#6556CD]'
          onClick={() => navigate(-1)}
        ></Link>
      </nav>

      <div className='w-full flex'>
        {/* Main part 2 left poster details */}
        <div className='w-[20%]'>
          <img
            className='h-[30vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]'
            src={info.detail.profile_path ? `https://image.tmdb.org/t/p/original/${info.detail.profile_path}` : noimage}
            alt="" />
          <hr className='mt-10 mb-5 border-none h-[2px] bg-zinc-500' />
          {/* social links */}
          <div className='text-2xl text-white flex gap-x-5 '>
            {/* person wikipedia page link*/}
            <a target='_blank' href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}>
              <i className='ri-earth-fill hover:text-zinc-400'></i>
            </a>
            {/* person fb page link*/}
            <a target='_blank' href={`https://www.facebook.com/${info.externalid.facebook_id}`}>
              <i className='ri-facebook-circle-fill hover:text-zinc-400'></i>
            </a>
            {/* person insta page link*/}
            <a target='_blank' href={`https://www.instagram.com/${info.externalid.instagram_id}`}>
              <i className='ri-instagram-fill hover:text-zinc-400'></i>
            </a>
            {/* person twitter page link*/}
            <a target='_blank' href={`https://www.twitter.com/${info.externalid.twitter_id}`}>
              <i className='ri-twitter-x-fill hover:text-zinc-400'></i>
            </a>
          </div>
          {/* personal info */}
          <h1 className='text-2xl text-zinc-400 font-semibold my-5'>
            Person Info
          </h1>
          <h1 className='text-zinc-400 font-semibold text-lg'>
            Known for
          </h1>
          <h1 className='text-zinc-400 '>
            {info.detail.known_for_department}
          </h1>
          <h1 className='text-zinc-400 font-semibold mt-3 text-lg'>
            Gender
          </h1>
          <h1 className='text-zinc-400'>
            {info.detail.gender === 1 ? "Female" : "Male"}
          </h1>
          <h1 className=' text-zinc-400 font-semibold mt-3 text-lg'>
            Birthday
          </h1>
          <h1 className='text-zinc-400'>
            {info.detail.birthday}
          </h1>
          <h1 className='text-zinc-400 font-semibold mt-3 text-lg'>
            Deathday
          </h1>
          <h1 className='text-zinc-400'>
            {info.detail.deathday ? info.detail.deathday : "Still Alive"}
          </h1>
          <h1 className=' text-zinc-400 font-semibold mt-3 tex-lg'>
            Place of Birth
          </h1>
          <h1 className='text-zinc-400'>
            {info.detail.place_of_birth}
          </h1>
          <h1 className=' text-zinc-400 text-lg font-semibold mt-3'>
            Also Known As
          </h1>
          <h1 className='text-zinc-400'>
            {info.detail.also_known_as.join(", ")}
          </h1>
        </div>

        {/* Main part 3 right info detail */}
        <div className='w-[80%] ml-[5%]'>
          <h1 className='text-5xl text-zinc-400 font-black mb-5'>
            {info.detail.name}
          </h1>
          <h1 className='text-zinc-400  text-lg font-bold'>
            Biography
          </h1>
          <p className='text-zinc-400 mt-3'>
            {info.detail.biography}
          </p>
          <h1 className='text-zinc-400  text-lg font-bold mt-5'>
            Known For
          </h1>
          <HorizontalCards data={info.combinedCredits.cast} />
          <div className='w-full flex justify-between'>
            <h1 className='text-zinc-400  text-lg font-bold mt-5'>
              Acting
            </h1>
            <Dropdown title="Category" options={["tv", "movie"]} fnx={(e) => setCategory(e.target.value)} />
          </div>
          <div className=' list-disc text-zinc-400 w-full h-[50vh] mt-5 overflow-y-auto shadow-lg shadow-[rgba(255,255,255,.3)] border-2 border-zinc-700 p-5'>
            {info[category + "Credits"].cast.map((item, idx) => (
              <li
                key={idx}
                className='p-5 rounded hover:text-white  hover:bg-[#6556CD] duration-300 cursor-pointer'>
                <Link to={`/${category}/details/${item.id}`}>
                  <span>
                    {""}
                    {item.name || item.original_name || item.title || item.original_title}
                  </span>
                  <span className='block ml-5'>
                    {item.character && `Character Name : ${item.character}`}
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default PersonDetails