"use client"

import SimilarProducts from '@/app/(components)/similarproducts'
import MainLayout from '@/app/(layouts)/mainlayout'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'


// int
const ProductPage = ({ params } : { params : { id : string } }) => {
  const dispatch = useDispatch()
  const isCartAdded = useSelector<RootState>(state=>state.cart.isItemAdded)
  console.log(isCartAdded)
  const product = {
    id : 1,
    title : "Brown Leather Bag",
    description : "Lorem ipusm motherfucker",
    url : "https://picsum.photos/id/7",
    price : 2500
  }

  return (
    <MainLayout>
      <div className='flex px-4 py-10'>
        {
          product.url ? 
          <img src={`${product.url}/280`} alt="" className='w-[40%] rounded-lg' /> :
          <div className="w-[40%]"></div>
        }

        <div className="px-4 w-full">
          <div className='px-4 w-full'>
            <div className='font-bold text-xl'>{ product.title }</div>
            <div className='text-sm text-gray-700 pt-2'>Brand New Full Warranty</div>
            <div className="border-b py-1"/>
            <div className="pt-3 pb-2">
              <div className="flex items-center">
                Condition: {" "} <span className="font-bold text-[17px]">New</span>
              </div>
            </div>
            <div className="border-b py-1"/>
            <div className="pt-3 ">
              <div className="w-full flex items-center  justify-between">
                <div className="flex items-center">
                  <div className="font-bold text-[20px] ml-2">${(product.price / 100).toFixed(2)}</div>
                </div>
                <button className='bg-blue-400 text-white py-2 px-3 rounded-md'>Add to Cart</button>
              </div>
            </div>
            <div className="border-b py-1">
              <div className="pt-3">
                <div className='font-semibold pb-1'>Description</div>
                <div className="text-sm">{ product.description }</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SimilarProducts />
    </MainLayout>
  )
}

export default ProductPage
