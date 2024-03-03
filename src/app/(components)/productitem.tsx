"use client"

import Link from 'next/link';
import React from 'react'

export type ProductProps = {
  id : number;
  title : string;
  description : string;
  url : string;
  price : number;

}




const ProductItem = ({ id, title, description, url, price } : ProductProps ) => {
  console.log(id, title, description, price, url)
  return (
    <Link 
    href={`/product/${id}`}
    className="max-w-6xl p-1.5 border border-gray-50 hover:border-gray-200 hover:shadow-xl bg-gray-50 rounded mx-auto"
    >
      {
        url ? <img src={`${url}/190`} alt="img" /> : null
      }
      <div className="pt-2 px-1">
        <div className='font-semibold text-[15px] hover:underline cursor-pointer'>
          { title }
        </div>

        <div className="font-extrabold">
          ${
            (price / 100).toFixed(2)
          }
        </div>

        <div className='relative flex items-center text-[12px] text-gray-500'>
          <div className="line-through">
            ${
              ((price * 1.2) / 100).toFixed(2)
            }
          </div>
          <div className='px-2'></div>
          <div className='line-through'>20%</div>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem
