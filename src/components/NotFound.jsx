import React from 'react'
import notfound from '/notfound.gif'

const NotFound = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black'>
        <img src={notfound} alt="" className='h-[50%] object-cover' />
    </div>
  )
}

export default NotFound;