"use client"
import Link from 'next/link'
import React from 'react'
import { BsChevronDown } from "react-icons/bs"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getCart, isItemAddedToCart } from '@/store/cartSlice'
import { RootState } from '@/store'


interface Menu {
  id : number;
  name : string;
}


const SubMenu = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state : RootState)=>state.cart.cart)
  // console.log(cart)
  const product = {
    id : 1,
    title : "Brown Leather Bag",
    description : "Lorem ipusm motherfucker",
    url : "https://picsum.photos/id/7",
    price : 2500
  }
  const menuItems : Menu[] = [
    { id : 1, name : "Home" },
    { id : 2, name : "Saved" },
    { id : 3, name : "Electronics" },
    { id : 4, name : "Motors" },
    { id : 5, name : "Fashion" },
    { id : 6, name : "Collectables and Art" },
    { id : 7, name : "Sports" },
    { id : 8, name : "Health & Beauty" },
    { id : 9, name : "Industrial Equipment" },
    { id : 10, name : "Home & Garden" },
    { id : 11 , name : "Sell" },
  ]
  React.useEffect(()=>{
    dispatch(getCart())
  }, [dispatch])
  return (
    <div className='border-b'>
       <div className="flex items-center justify-between w-full mx-auto max-w-[1200px]">
        <ul className="flex items-center text-[13px] px-2 h-8 text-[#333333]">
          {
            menuItems.map(item=>(
              <li className='px-3 hover:underline cursor-pointer' key={item.id}>
                { item.name }    
              </li>
            ))
          }
          <li
          >Apply</li>
        </ul>
       </div>
    </div>
  )
}

export default SubMenu