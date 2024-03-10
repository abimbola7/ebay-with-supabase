"use client"
import Link from 'next/link'
import React from 'react'
import { BsChevronDown } from "react-icons/bs"
import { AiOutlineShoppingCart } from "react-icons/ai"
import useSupabase from '@/app/(hooks)/useSupabase'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { cartCount } from '@/store/cartSlice'

const TopMenu = () => {
  const totals = useSelector((state:RootState)=>state.cart.total)
  const dispatch = useDispatch()
  const [ isMenu, setIsMenu ] = React.useState(false);
  const  { 
    user,id,name,picture,email,setSession,signOut
   } = useSupabase();

  const isLoggedIn = () => {
    // console.log(user, user?.id)
    if (user && user.id) {
      return (
        <button 
        onClick={()=>setIsMenu((prevState)=>!prevState)}
        className="flex items-center gap-2 hover:underline cursor-pointer">
          <span>
            Hi, { name }
          </span>
          <BsChevronDown />
        </button>
      )
    }
    return (
      <Link 
      href="/auth"
      className='flex items-center gap-2 hover:underline cursor-pointer'
      >
        <div>Login</div>
        <BsChevronDown />
      </Link>
    )
  }

  React.useEffect(()=>{
    dispatch(cartCount())
  }, [])

  return (
    <div className='border-b'>
       <div className="flex items-center justify-between w-full mx-auto max-w-[1200px]">
        <ul className='flex items-center text-[11px] text-[#333333] px-2 h-8'>
          <li className="relative px-3">
            {isLoggedIn()}       
            <div className={`${ isMenu ? 'visible' : 'hidden' }   absolute bg-white w-[200px] text-[#333333] z-40 left-0 top-[20px] border shadow-lg`}>
              <div className='flex items-center justify-start gap-1 p-3'>
                <img src={`${picture}`} alt="" width={50}/>
                <div className="font-bold text-[13px]">{name}</div>
              </div>

              <div className="border-b"/>

              <ul className="bg-white">
                <li className="text-[11px] py-2 px-4 w-full hover:underline text-blue-500 hover:text-blue-600 cursor-pointer">
                  <Link href="/orders">
                    Orders
                  </Link>
                </li>
                <li 
                onClick={()=>{ signOut(); setIsMenu(false) }}
                className="text-[11px] py-2 px-4 w-full hover:underline text-blue-500 hover:text-blue-600 cursor-pointer">
                  Sign Out
                </li>

              </ul>
            </div>
          </li>
          <li className="px-3 hover:underline cursor-pointer">
            Daily Deals
          </li>
          <li className="px-3 hover:underline cursor-pointer">
            Help & Contact
          </li>
        </ul>


        <ul className="flex items-center text-[11px] text-[#333333] px-2 h-8">
          <li className='flex items-center gap-2 px-3 hover:underline cursor-pointer'>
            <img width={32} src="/images/uk.png"/>
            Ship to
          </li>
          <li className='px-3 hover:underline cursor-pointer'>
            <div className="relative">
              <AiOutlineShoppingCart size={22}/>
              {
                totals > 0 && (
                  <div className='absolute text-[10px] -top-[2px] -right-[5px] bg-red-500 w-[14px] h-[14px] rounded-full text-white text-center flex justify-center items-center'>
                    <div className='flex items-center justify-center -mt-[1px]'>
                      { totals }
                    </div>
                  </div>
                )
              }
            </div>
          </li>
        </ul>
       </div>
    </div>
  )
}

export default TopMenu