import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { removetv } from '../store/reducers/tvSlice'
import { asyncloadtv } from '../store/actions/tvActions'
import Loading from './Loading'
import HorizontalCards from './templates/HorizontalCards'
import noimage from '../../public/no-image.jpg'

const TvDetails = () => {
  const { id } = useParams()
  const { info } = useSelector(state => state.tv)
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncloadtv(id))
    return () => {
      dispatch(removetv())
    }
  }, [id])

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2 ),rgba(0,0,0,.5),rgba(0,0,0,.8)), 
                  url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "top 10%",
        backgroundSize: "cover"
      }}
      className='w-screen h-[180vh] px-[10%] relative'>


      {/* Main part 1 navbar */}
      <nav className='w-full h-[10vh] text-zinc-100 text-xl flex items-center gap-10'>
        <Link
          className='ri-arrow-left-line hover:text-[#6556CD]'
          onClick={() => navigate(-1)}
        ></Link>
        {/* tv official page link*/}
        <a target='_blank' href={info.detail.homepage}>
          <i className='ri-external-link-fill hover:text-zinc-400'></i>
        </a>
        {/* tv wikipedia page link*/}
        <a target='_blank' href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}>
          <i className='ri-earth-fill hover:text-zinc-400'></i>
        </a>
        {/* tv imdb page link*/}
        <a target='_blank' href={`https://www.imdb.com/title/${info.externalid.imdb_id}`} className='hover:text-zinc-400'>
          imdb
        </a>
      </nav>

      {/* Main part 2 poster and details */}
      <div className='w-full flex'>
        <div className='w-full flex flex-col items-center'>
          <img
            className='h-[50vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]'
            src={info.detail.poster_path || info.detail.backdrop_path
              ? `https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path}`
              : noimage}
            alt=""
          />

          <Link
            className='mt-3 py-3 px-8 bg-[#6556CD] rounded-lg'
            to={`${pathname}/trailer`}>
            <i className='ri-play-fill mr-3 text-xl'></i>
            Play Trailer
          </Link>
        </div>

        {/* details */}
        <div className='content ml-[5%] text-white'>
          {/* detail 1 */}
          <h1 className='text-5xl font-black'>
            {info.detail.title || info.detail.original_title || info.detail.name || info.detail.original_name}
            <small className='text-2xl font-bold text-zinc-200'>
              ({info.detail.first_air_date.split("-")[0]})
            </small>
          </h1>
          {/* detail 2 */}
          <div className='mt-3 mb-5 flex items-center gap-x-3'>
            <span className='w-[6vh] h-[6vh] rounded-full text-lg font-semibold bg-yellow-600 flex justify-center items-center'>
              {(info.detail.vote_average * 10).toFixed()}
              <sup>%</sup>
            </span>
            <h1 className='w-[70px] font-medium text-lg leading-5'>
              User Score
            </h1>
            <h1 className='text-lg mr-3 '>
              {info.detail.first_air_date}
            </h1>
            <h1 className='text-lg mr-3 '>
              {info.detail.genres.map((item) => item.name).join(", ")}
            </h1>
            <h1 className='text-lg'>
              {info.detail.episode_run_time && info.detail.episode_run_time.length > 0 ? `${info.detail.episode_run_time}min` : null}
            </h1>
          </div>
          {/* detail 3 */}
          <h1 className='text-lg font-medium italic text-zinc-200'>
            {info.detail.tagline}
          </h1>
          {/* detail 3 */}
          <h1 className='text-lg mt-3 mb-1 font-medium'>
            Overview
          </h1>
          <p>
            {info.detail.overview}
          </p>
          {/* detail 4 */}
          <h1 className='text-lg mt-3 mb-1 font-medium'>
            Translated Versions
          </h1>
          <p className='mb-10'>
            {info.translations.join(", ")}
          </p>
        </div>
      </div>

      {/* Main part 3 available on platform */}
      <div className='w-[80%] flex flex-col gap-y-5 mt-10 font-medium '>
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className='flex gap-x-10 items-center text-white'>
            <h1>Available on Platform</h1>
            {info.watchproviders.flatrate.map((item, idx) => (
              <img
                key={idx}
                title={item.provider_name}
                className='w-[5vh] h-[5vh] rounded-md object-cover'
                src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
                alt="" />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className='flex gap-x-10 items-center text-white'>
            <h1>Available on Rent</h1>
            {info.watchproviders.rent.map((item, idx) => (
              <img
                key={idx}
                title={item.provider_name}
                className='w-[5vh] h-[5vh] rounded-md object-cover'
                src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
                alt="" />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className='flex gap-x-10 items-center text-white'>
            <h1>Available to Buy</h1>
            {""}
            {info.watchproviders.buy.map((item, idx) => (
              <img
                key={idx}
                title={item.provider_name}
                className='w-[5vh] h-[5vh] rounded-md object-cover'
                src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
                alt="" />
            ))}
          </div>
        )}
      </div>

      {/* Main Part 4 Seasons */}
      <hr className='mt-10 mb-5 border-none h-[2px] bg-zinc-500' />
      <h1 className='text-xl font-bold text-white'>
        Seasons
      </h1>
      <div className='w-[100%] flex overflow-y-hidden mb-5 p-4'>
        {info.detail.seasons.length > 0 ? info.detail.seasons.map((item, idx) => (
          <Link
            to={`/tv/details/${item.id}`}
            key={idx}
            className='min-w-[10vw] mr-4'>
            <img
              className='w-full h-[30vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]'
              src={item.poster_path ? `https://image.tmdb.org/t/p/original/${item.poster_path}` : noimage}
              alt="" />
            <h1 className='text-lg text-zinc-300 mt-3 font-bold'>
              {item.name}
            </h1>
          </Link>
        )) : (
          <h1 className='mt-5 text-2xl text-white font-black text-center'>Nothing to Show</h1>
        )}
      </div>

      {/* Main Part 5 Recommendations and similar stuff */}
      <hr className='mt-10 mb-5 border-none h-[2px] bg-zinc-500' />
      <h1 className='text-xl font-bold text-white'>
        Recommendations & Similar stuff
      </h1>
      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />

      <Outlet />
    </div>
  ) : (
    <Loading />
  )
}

export default TvDetails