"use client"
import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Loading = () => {
  return (
    <div
    className='fixed bg-black bg-opacity-70 inset-0 w-full flex items-center justify-center z-40 min-h-screen overflow-hidden'
    >
      <div className="p-3 rounded-md">
        <AiOutlineLoading3Quarters
        size={100}
        className='text-blue-400 animate-spin'
        />
      </div>
    </div>
  )
}

export default Loading
