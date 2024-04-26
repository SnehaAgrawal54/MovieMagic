import React from 'react'
import loader from '/loader.gif'

const Loading = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black'>
        <img src={loader} alt="" className='h-[50%] object-cover' />
    </div>
  )
}

export default Loading;