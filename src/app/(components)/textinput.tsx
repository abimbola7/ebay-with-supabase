"use client"

import React from 'react'


// type ChangeHandler = React.ChangeEventHandler<HTMLInputElement>

interface Input {
  className : string;
  string : string;
  placeholder? : string;
  error? : string;
  onUpdate? : (value : string) => void
}

const TextInput = ({
  string,
  placeholder,
  error,
  onUpdate
} : Input) => {
  return (
    <>
      <input
      autoComplete='off'
      type="text" 
      placeholder={placeholder} 
      className="w-full bg-white text-gray-800 border text-sm border-[#272727] p-3 placeholde-gray-500 focus:outline-none"
      value={ string || "" }
      // onChange={(event)=>onUpdate(event?.target.value)}
      />
      <div className="text-red-500 text-[14px] font-semibold">
        {
          error ? (error) : null
        }
      </div>
    </>
  )
}

export default TextInput
