"use client"
import { Products } from '@/app/page'
import debounce from 'debounce'
import Link from 'next/link'
import React, { ChangeEvent } from 'react'
import { AiOutlineSearch } from "react-icons/ai"
import { BiLoaderCircle } from "react-icons/bi"

const MainHeader = () => {
  const [ items, setItems ] = React.useState<Products[]>([])
  const [ isSearching, setIsSearching ] = React.useState<boolean>(false);


  const handleSearchName = debounce(
    async (event:ChangeEvent<HTMLInputElement>) => {
      if (event.target.value === "") {
        setItems([])
        return
      }
      try {
        const res = await fetch(`/api/products/search-by-name/${event.target.value}`)
        const result =  await res.json();
        if (result) {
          setItems(result)
          setIsSearching(false)
          return
        }
        setItems([])
        setIsSearching(false)
      }catch(error){
        console.log(error)
        setIsSearching(false)
      }
    }, 500)
  
  return (
    <div className='border-b'>
       <div className="flex items-center justify-between w-full mx-auto max-w-[1200px]">
        <div className="flex items-center w-full bg-white">
          <div className='flex lg:justify-start justify-between gap-10 max-w-[1150px] w-full px-3 py-5 mx-auto'>
            <Link href="/">
              <img src="/images/logo.svg" alt="" width={120}/>
            </Link>
            <div className="w-full">
              <div className='relative'>
                <div className="flex items-center">
                  <div className="flex items-center relative  border-2 border-gray-900 w-full p-2">
                    <button className='flex items-center'>
                      <AiOutlineSearch size={22}/>
                    </button>
                    <input 
                    type="text" 
                    onChange={handleSearchName}
                    className="w-full placeholder-gray-400 text-sm pl-3 focus:outline-none flex-1"
                    placeholder='Search for something'
                    />
                    {
                      isSearching && <BiLoaderCircle className='mr-2 animate-spin' size={22} />
                    }
                    {
                      items.length > 0 && (
                        <div className="absolute bg-white max-w-[90%] mx-auto h-auto w-full z-20 left-0 top-12 border p-1">
                          {
                            items.map(item=>(
                              <div className="p-1" key={item.id}>
                                <Link 
                                className='flex items-center justify-between w-full cursor-pointer hover:bg-gray-200 pl-1 px-2'
                                href={`/product/${item?.id}`}>
                                  <div className='flex items-center'>
                                    <img src={`${item?.url}/40`} alt="img" className="rounded-md" width={40} />
                                    <div className="truncate ml-2">
                                      { item?.title }
                                    </div>
                                  </div>
                                  <div className="truncate">
                                    ${
                                      (item?.price / 100).toFixed(2)
                                    }
                                  </div>
                                </Link>
                              </div>
                            ))
                          }
                        </div>
                      )
                    }
                  </div>
                  <button className="flex items-center bg-blue-600 text-sm font-semibold text-white p-[11px] ml-2 px-14">
                    Search
                  </button>
                  <div className='text-xs hover:text-blue-500 cursor-pointer px-2'>
                    Advanced
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       </div>
    </div>
  )
}

export default MainHeader